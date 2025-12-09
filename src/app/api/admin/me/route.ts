import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/middleware/auth';

export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request);

    if ('error' in authResult) {
      return NextResponse.json(
        {
          success: false,
          message: authResult.error,
        },
        { status: authResult.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        admin: authResult.admin,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Server error',
      },
      { status: 500 }
    );
  }
}
