/* eslint-disable import/prefer-default-export */

import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import connectToDB from "@/lib/mongoose";
import EventModel from "@/models/Event";
import cloudinary from "@/utils/cloudinary";

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

    const {
      name,
      bio,
      djs,
      location,
      image,
      date,
      locationLink,
      locationMapLink,
      ticketLink,
      isActive,
    } = await req.json();

    await connectToDB();
    const imgResult = await cloudinary.v2.uploader.upload(image, {
      folder: "eventImages",
    });

    await EventModel.create({
      name,
      bio,
      djs,
      location,
      image: {
        public_id: imgResult.public_id,
        url: imgResult.secure_url,
      },
      date,
      locationLink,
      locationMapLink,
      ticketLink,
      isActive,
    });

    revalidateTag("Events");

    return NextResponse.json({ message: "Eventas sukurtas!" }, { status: 201 });
  } catch (error) {
    console.log("event/post", error);
    return NextResponse.json(
      { error: "Evento nepavyko sukurti!" },
      { status: 406 }
    );
  }
};

export const GET = async () => {
  try {
    await connectToDB();
    const events = await EventModel.find()
      .populate({
        path: "djs",
        select: "-socials -image -createdAt -updatedAt -__v",
      })
      .select("-bio -image -locationMapLink -createdAt -updatedAt -__v")
      .sort({ date: -1 })
      .exec();

    const newEvents = events.filter((event) => event.isActive === true);
    const oldEvents = events.filter((event) => event.isActive === false);
    return NextResponse.json(
      { events: { newEvents, oldEvents } },
      { status: 200 }
    );
  } catch (error) {
    console.log("event/get", error);
    return new NextResponse("Unable to load", { status: 404 });
  }
};
