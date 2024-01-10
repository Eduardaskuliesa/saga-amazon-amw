/* eslint-disable no-await-in-loop */
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import connectToDB from "@/lib/mongoose";
import Album from "../../../models/Album";
import cloudinary from "../../../utils/cloudinary";

const jwt = require("jsonwebtoken");

export const POST = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("saga-sessionToken")?.value;
    if (!token) {
      return NextResponse.json({ error: "Neturi teises!" }, { status: 401 });
    }

    const validToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!validToken) {
      return NextResponse.json({ error: "Neturi teises!" }, { status: 401 });
    }

    const data = await req.formData();

    const name = data.get("name");
    const date = data.get("date");
    const imagesFiles: File[] | null = data.getAll(
      "image[]"
    ) as unknown as File[];

    if (!imagesFiles) {
      return NextResponse.json(
        { error: "Nepavyko sukurti albumo! Reikia nuotrauku!" },
        { status: 400 }
      );
    }

    const imagesBytesPromises = imagesFiles.map((image) => image.arrayBuffer());

    const imagesBytes = await Promise.all(imagesBytesPromises);

    const imagesBuffer = imagesBytes.map((image) => Buffer.from(image));

    const images: {
      public_id: any;
      url: any;
      width: any;
      height: any;
    }[] = [];

    const resultPromises = imagesBuffer.map((image) =>
      cloudinary.v2.uploader.upload(
        `data:image/jpeg;base64,${image.toString("base64")}`,
        {
          folder: "albumImages",
        }
      )
    );

    const results = await Promise.all(resultPromises);

    results.forEach((result) =>
      images.push({
        public_id: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height,
      })
    );

    await connectToDB();

    const album = await Album.create({
      name,
      date,
      images,
    });
    revalidateTag("Albums");

    return NextResponse.json(
      { message: "Album created!", album },
      { status: 201 }
    );
  } catch (error) {
    console.log("album/post", error);
    return NextResponse.json(
      { message: "Unable to create album" },
      { status: 400 }
    );
  }
};

export const GET = async () => {
  try {
    await connectToDB();
    const albums = await Album.find().sort({ date: -1 });
    return NextResponse.json({ albums });
  } catch (error) {
    console.log("album/get");
    return NextResponse.json({ error: "Unable to Load" }, { status: 404 });
  }
};
