import { NextRequest, NextResponse } from 'next/server';

const jwt = require('jsonwebtoken');

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (password !== process.env.ADMIN_LOGIN) return NextResponse.json({ error: 'Neturi teises!' }, { status: 401 });

    //should be 15min
    const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '12h' });

    const authLink = `${req.nextUrl.href}/verify?token=${token}`;
    const dataToSend = {
      service_id: process.env.EMAIL_SERVICE,
      template_id: process.env.AUTH_EMAIL_TEMPLATE,
      user_id: process.env.EMAIL_PUBLIC,
      accessToken: process.env.EMAIL_PRIVATE,
      template_params: {
        login_link: authLink,
      },
    };
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    if (res.ok) return NextResponse.json({ message: 'Prisjungimas taves lauke el.paste!' }, { status: 201 });

    return NextResponse.json({ error: 'Ups! Nepavyko isiusti, bandyk dar karta veliau!' }, { status: 406 });
  } catch (err) {
    console.log('auth/post', err);
    return NextResponse.json({ message: 'Ups! Nepavyko, bandyk dar karta!' }, { status: 406 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    if (!req.cookies.get('saga-sessionToken')) return NextResponse.json({ error: 'Nepavyko atsijungti!' }, { status: 401 });
    const res = NextResponse.json({ message: 'Atsijungei!' }, { status: 200 });

    res.cookies.delete('saga-sessionToken');

    return res;
  } catch (err) {
    console.log('auth/delete', err);
    return NextResponse.json({}, { status: 406 });
  }
}
