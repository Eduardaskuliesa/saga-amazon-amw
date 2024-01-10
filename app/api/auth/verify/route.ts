import { NextRequest, NextResponse } from 'next/server';

const jwt = require('jsonwebtoken');

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const token = searchParams.get('token');
    const validToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!validToken) return NextResponse.json({ message: 'Neturi teises!' }, { status: 403 });
    const sessionToken = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '12h' });

    const res = NextResponse.redirect(`${req.nextUrl.origin}`);

    res.cookies.set({
      name: 'saga-sessionToken',
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_STATE !== 'development',
      sameSite: 'strict',
      maxAge: 43200,
      path: '/',
    });

    return res;
  } catch (err) {
    console.log('auth/verify/get', err);
    return NextResponse.json({ message: 'Ups! Nepavyko, bandyk dar karta!' }, { status: 406 });
  }
}
