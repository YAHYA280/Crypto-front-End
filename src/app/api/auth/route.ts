// src/app/api/auth/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Call the external API
    const response = await fetch('https://api.cryptoarchitect.nl/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.message || 'Login failed' }, { status: response.status });
    }

    // Extract session token from the response
    const { session_token } = data;

    // Create a response with the data
    const responseObj = NextResponse.json({ success: true, data });

    // Set the session token as an HTTP-only cookie
    responseObj.cookies.set('session_token', session_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60, // 1 week
      path: '/',
      sameSite: 'strict',
    });

    return responseObj;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
