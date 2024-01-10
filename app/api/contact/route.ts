import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    const dataToSend = {
      service_id: process.env.EMAIL_SERVICE,
      template_id: process.env.EMAIL_TEMPLATE,
      user_id: process.env.EMAIL_PUBLIC,
      accessToken: process.env.EMAIL_PRIVATE,
      template_params: {
        name,
        email,
        message,
      },
    };
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    if (res.ok) return NextResponse.json({ message: 'Žinute išsiųsta' }, { status: 201 });
    return NextResponse.json({ error: 'Žinutes išsiųsti nepavyko' }, { status: 406 });
  } catch (err) {
    console.log('contact/post', err);
    return NextResponse.json({ message: 'Žinutes išsiųsti nepavyko' }, { status: 406 });
  }
}
