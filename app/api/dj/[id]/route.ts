import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import connectToDB from '@/lib/mongoose';
import cloudinary from '@/utils/cloudinary';
import Dj from '@/models/Dj';

const jwt = require('jsonwebtoken');

export const DELETE = async (req: NextRequest, { params }: Params) => {
  const { id } = params;
  try {
    const token = req.cookies.get('saga-sessionToken')?.value;
    if (!token) return NextResponse.json({ error: 'Neturi teises!' }, { status: 401 });

    const validToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!validToken) return NextResponse.json({ error: 'Neturi teises!' }, { status: 401 });

    await connectToDB();
    const delDj = await Dj.findByIdAndDelete(id);
    if (delDj) await cloudinary.v2.uploader.destroy(delDj.image.public_id);

    revalidateTag('Djs');
    return NextResponse.json({ message: 'Dj istrintas!' }, { status: 410 });
  } catch (error) {
    console.log('dj/_id/delete', error);
    return NextResponse.json({ error: 'Nepavyko istrinti dj!' }, { status: 405 });
  }
};
