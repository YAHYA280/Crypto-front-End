// src/app/api/auth/logout/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Get the session token from cookies - fixed approach
    const cookieStore = cookies();
    const session_token = (await cookieStore).get('session_token')?.value;

    if (!session_token) {
      return NextResponse.json({ success: true, message: 'Already logged out' });
    }

    // Call the external API
    const response = await fetch('https://api.cryptoarchitect.nl/api/v1/users/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session_token}`,
      },
    });

    // Create a response object
    const responseObj = NextResponse.json({ success: true });

    // Delete the session cookie
    responseObj.cookies.delete('session_token');

    return responseObj;
  } catch (error) {
    console.error('Logout error:', error);
    // Still create a response that clears the cookie
    const responseObj = NextResponse.json({ error: 'An error occurred during logout' }, { status: 500 });
    responseObj.cookies.delete('session_token');
    return responseObj;
  }
}
