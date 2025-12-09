import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Admin from '@/lib/models/Admin';
import { SignJWT } from 'jose';

export async function POST(request: NextRequest) {
  try {
    console.log('Login API called');

    await connectDB();
    console.log('Database connected');

    const body = await request.json();
    console.log('Request body:', { email: body.email });

    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please provide email and password',
        },
        { status: 400 }
      );
    }

    // Check for admin with password field
    const admin = await Admin.findOne({ email }).select('+password');
    console.log('Admin found:', !!admin);

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid credentials',
        },
        { status: 401 }
      );
    }

    // Check if admin is active
    if (!admin.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: 'Admin account is deactivated',
        },
        { status: 401 }
      );
    }

    // Check if password matches
    const isMatch = await admin.comparePassword(password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid credentials',
        },
        { status: 401 }
      );
    }

    // ✅ Update last login using updateOne (doesn't trigger pre-save hook)
    await Admin.updateOne(
      { _id: admin._id },
      { lastLogin: new Date() }
    );

    // Generate JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const token = await new SignJWT({ id: admin._id.toString() })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(secret);

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        token,
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        },
      },
      { status: 200 }
    );

    // Set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login API Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Server error',
      },
      { status: 500 }
    );
  }
}
