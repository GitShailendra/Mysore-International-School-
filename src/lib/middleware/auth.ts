import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import Admin from '@/lib/models/Admin';
import connectDB from '@/lib/db';

export interface AuthRequest extends NextRequest {
  admin?: any;
}

export async function verifyAuth(request: NextRequest) {
  try {
    // Get token from cookies or Authorization header
    let token = request.cookies.get('token')?.value;

    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }

    if (!token) {
      return { error: 'Not authorized to access this route', status: 401 };
    }

    // Verify token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    // Connect to database
    await connectDB();

    // Get admin from token
    const admin = await Admin.findById(payload.id).select('-password');

    if (!admin) {
      return { error: 'Admin not found', status: 401 };
    }

    if (!admin.isActive) {
      return { error: 'Admin account is deactivated', status: 401 };
    }

    return { admin };
  } catch (error) {
    return { error: 'Not authorized to access this route', status: 401 };
  }
}
