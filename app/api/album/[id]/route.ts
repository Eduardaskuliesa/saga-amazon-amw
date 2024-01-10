/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { revalidateTag } from "next/cache";
import connectToDB from "@/lib/mongoose";
import Album from "@/models/Album";
import cloudinary from "@/utils/cloudinary";

const jwt = require("jsonwebtoken");

export const GET = async (req: NextRequest, { params }: Params) => {
  const { id } = params;
  try {
    await connectToDB();

    const album = await Album.findById({ _id: id })
      .select("-createdAt -updatedAt -__v")
      .exec();
    return NextResponse.json({ album }, { status: 200 });
  } catch (error) {
    console.log("album/_id/Get", error);
    return NextResponse.json({ message: "Unalbe to load" }, { status: 404 });
  }
};

export const DELETE = async (req: NextRequest, { params }: Params) => {
  const { id } = params;
  const token = req.cookies.get("saga-sessionToken")?.value;
  if (!token)
    return NextResponse.json({ error: "Neturi teises!" }, { status: 401 });

  const validToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!validToken)
    return NextResponse.json({ error: "Neturi teises!" }, { status: 401 });

  try {
    await connectToDB();
    const album = await Album.findById({ _id: id });

    const deleteImageFromCloudinary = album.images.forEach(
      ({ public_id }: AlbumImages) => cloudinary.v2.uploader.destroy(public_id)
    );

    const deleteAlbum = await Album.findByIdAndDelete({ _id: id });

    revalidateTag("Albums");
    return NextResponse.json({ message: "Albumas Deleted" }, { status: 200 });
  } catch (error) {
    console.log("album/_id/Delete", error);
    return NextResponse.json({ message: "Unable" }, { status: 403 });
  }
};

export const PATCH = async (req: NextRequest, { params }: Params) => {
  const { id } = params;
  const token = req.cookies.get("saga-sessionToken")?.value;
  if (!token) {
    return NextResponse.json({ error: "Neturi teises!" }, { status: 401 });
  }

  const validToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!validToken) {
    return NextResponse.json({ error: "Neturi teises!" }, { status: 401 });
  }
  try {
    await connectToDB();
    const { images, name, date } = await req.json();
    const imagesBuffer: {
      public_id: any;
      url: any;
      width: any;
      height: any;
    }[] = [];
    const resultPromises = images.map((image: string) =>
      cloudinary.v2.uploader.upload(image, {
        width: "1920",
        folder: "albumImages",
        crop: "scale",
      })
    );

    const results = await Promise.all(resultPromises);

    results.forEach((result) =>
      imagesBuffer.push({
        public_id: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height,
      })
    );

    const updateAlbum = await Album.findByIdAndUpdate(
      { _id: id },
      {
        name,
        date,
        $push: { images: imagesBuffer },
      }
    );
    revalidateTag("Albums");
    return NextResponse.json(
      { message: "Album  updated!", updateAlbum },
      { status: 201 }
    );
  } catch (error) {
    console.log("album/post", error);
    return NextResponse.json(
      { message: "Unable to update album" },
      { status: 400 }
    );
  }
};
