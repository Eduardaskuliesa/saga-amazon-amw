/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import connectToDB from '@/lib/mongoose';
import EventModel from '@/models/Event';
import cloudinary from '@/utils/cloudinary';

const jwt = require('jsonwebtoken');

export const GET = async (req: NextRequest, { params }: Params) => {
  const { id } = params;
  try {
    await connectToDB;
    const event = await EventModel.findById({ _id: id })
      .populate({
        path: 'djs',
        select: '-createdAt -updatedAt -__v',
      })
      .select('-createdAt -updatedAt -__v')
      .exec();

    return NextResponse.json({ event }, { status: 200 });
  } catch (error) {
    console.log('event/_id/get', error);
    return NextResponse.json({ error: 'Page has not been found!' }, { status: 404 });
  }
};

export const DELETE = async (req: NextRequest, { params }: Params) => {
  const { id } = params;
  try {
    const token = req.cookies.get('saga-sessionToken')?.value;
    if (!token) return NextResponse.json({ error: 'Neturi teises!' }, { status: 401 });

    const validToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!validToken) return NextResponse.json({ error: 'Neturi teises!' }, { status: 401 });

    await connectToDB();

    const delEvent = await EventModel.findByIdAndDelete(id);

    if (delEvent) await cloudinary.v2.uploader.destroy(delEvent.image.public_id);

    revalidateTag('Events');
    return NextResponse.json({ message: 'Eventas istrintas!' }, { status: 410 });
  } catch (error) {
    console.log('event/_id/delete', error);
    return NextResponse.json({ message: 'Nepavyko istrinti evento!' }, { status: 405 });
  }
};

export const PATCH = async (req: NextRequest, { params }: Params) => {
  const { id } = params;
  try {
    const token = req.cookies.get('saga-sessionToken')?.value;
    if (!token) return NextResponse.json({ error: 'Neturi teises!' }, { status: 401 });

    const validToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!validToken) return NextResponse.json({ error: 'Neturi teises!' }, { status: 401 });

    await connectToDB();
    const {
      name, bio, djs, location, image, date,
      locationLink, locationMapLink, ticketLink, isActive,
    } = await req.json();

    const updatedEvent: UpdateEvent = {
      name,
      bio,
      djs,
      location,
      date,
      locationLink,
      locationMapLink,
      ticketLink,
      isActive,
    };
    if (image !== '') {
      const oldEvent = await EventModel.findById({ _id: id }).exec();
      await cloudinary.v2.uploader.destroy(oldEvent.image.public_id);
      const newEventPhoto = await cloudinary.v2.uploader.upload(image, {
        folder: 'eventImages',
      });
      updatedEvent.image = {
        public_id: newEventPhoto.public_id,
        url: newEventPhoto.url,
      };
    }

    await EventModel.findByIdAndUpdate({ _id: id }, updatedEvent);
    revalidateTag('Events');
    return NextResponse.json({ message: 'Eventas pakeistas!' }, { status: 200 });
  } catch (error) {
    console.log('event/_id/patch', error);
    return NextResponse.json({ message: 'Nepavyko pakeisti evento!' }, { status: 406 });
  }
};
