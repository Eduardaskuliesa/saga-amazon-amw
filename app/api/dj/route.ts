import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import connectToDB from '@/lib/mongoose';
import DjModel from '@/models/Dj';
import cloudinary from '@/utils/cloudinary';

const jwt = require('jsonwebtoken');

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('saga-sessionToken')?.value;
    if (!token) return NextResponse.json({ error: 'Neturi teises!' }, { status: 401 });

    const validToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!validToken) return NextResponse.json({ error: 'Neturi teises!' }, { status: 401 });

    const { name, image, socials } = await req.json();
    await connectToDB();

    const imgResult = await cloudinary.v2.uploader.upload(image, {
      folder: 'djsImages',
    });

    await DjModel.create({
      name,
      image: {
        public_id: imgResult.public_id,
        url: imgResult.secure_url,
      },
      socials,
    });

    revalidateTag('Djs');
    return NextResponse.json({ message: 'Naujas dj buvo sukurtas!' }, { status: 201 });
  } catch (err) {
    console.log('dj/post', err);
    return NextResponse.json({ error: 'Nepaviko sukurti naujo dj!' }, { status: 406 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('saga-sessionToken')?.value;
    if (!token) return NextResponse.json({ error: 'Neturi teises!' }, { status: 401 });

    const validToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!validToken) return NextResponse.json({ error: 'Neturi teises!' }, { status: 401 });

    await connectToDB();

    const djs = await DjModel.find();

    return NextResponse.json({ djs }, { status: 201 });
  } catch (err) {
    console.log('dj/get', err);
    return NextResponse.json({ error: 'Nepaviko sukurti naujo dj!' }, { status: 406 });
  }
}
