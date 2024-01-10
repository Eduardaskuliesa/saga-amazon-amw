import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import connectToDB from '@/lib/mongoose';
import YtVideo from '@/models/YtVideo';

const jwt = require('jsonwebtoken');

export const DELETE = async (req: NextRequest, { params }: Params) => {
  const { id } = params;
  try {
    const token = req.cookies.get('saga-sessionToken')?.value;
    if (!token) return NextResponse.json({ error: 'Neturi teises!' }, { status: 401 });

    const validToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!validToken) return NextResponse.json({ error: 'Neturi teises!' }, { status: 401 });

    await connectToDB();
    await YtVideo.findByIdAndDelete(id);

    revalidateTag('YtVideos');
    return NextResponse.json({ message: 'Video pasalintas!' }, { status: 410 });
  } catch (error) {
    console.log('video/_id/delete', error);
    return NextResponse.json({ message: 'Nepavyko pasalinti video!' }, { status: 405 });
  }
};
