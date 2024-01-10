/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { revalidateTag } from 'next/cache';
import connectToDB from '@/lib/mongoose';
import Album from '@/models/Album';
import cloudinary from '@/utils/cloudinary';

const jwt = require('jsonwebtoken');

export const PATCH = async (req: NextRequest, { params }: Params) => {
  const token = req.cookies.get('saga-sessionToken')?.value;
  if (!token) return NextResponse.json({ error: 'Neturi teises!' }, { status: 401 });

  const validToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!validToken) return NextResponse.json({ error: 'Neturi teises!' }, { status: 401 });
  const { id } = params;
  const publicId = `${id[1]}/${id[2]}`;
  try {
    await connectToDB();
    await cloudinary.v2.uploader.destroy(publicId);
    const deletePhoto = await Album.findByIdAndUpdate(
      { _id: id[0] },
      { $pull: { images: { public_id: publicId } } },
      { new: true },
    ).exec();

    if (deletePhoto.images.length === 0) {
      await Album.findByIdAndDelete({
        _id: id[0],
      });
      revalidateTag('Albums');
    }
    revalidateTag('Photo');
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log('photo/_id/patch', error);
    return NextResponse.json('Unable to delete', { status: 403 });
  }
};
