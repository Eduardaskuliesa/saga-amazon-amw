import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import connectToDB from "@/lib/mongoose";
import YtVideo from "@/models/YtVideo";

const jwt = require("jsonwebtoken");

export const POST = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("saga-sessionToken")?.value;
    if (!token)
      return NextResponse.json({ error: "Neturi teises!" }, { status: 401 });

    const validToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!validToken)
      return NextResponse.json({ error: "Neturi teises!" }, { status: 401 });

    await connectToDB();
    const { name, date, youtubeId, event } = await req.json();

    const dataToCreate: NewYtVideo = {
      name,
      date,
      youtubeId,
    };

    if (event && event !== "") {
      dataToCreate.event = event;
    }

    await YtVideo.create(dataToCreate);

    revalidateTag("YtVideos");

    return NextResponse.json({ message: "Video pridetas!" }, { status: 201 });
  } catch (error) {
    console.log("video/post", error);
    return NextResponse.json(
      { error: "Video nepavyko prideti!" },
      { status: 406 }
    );
  }
};

export const GET = async () => {
  try {
    await connectToDB();
    const ytVideos = await YtVideo.find()
      .select(" -createdAt -updatedAt -__v")
      .sort({ date: -1 })
      .exec();

    return NextResponse.json({ ytVideos }, { status: 200 });
  } catch (error) {
    console.log("video/get", error);
    return new NextResponse("Unable to load", { status: 404 });
  }
};
