import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('🔴 Logout API endpoint hit');
  
  try {
    const response = NextResponse.json(
      {
        success: true,
        message: 'Logged out successfully',
      },
      { status: 200 }
    );

    // Clear all possible cookie variations
    response.cookies.set('token', '', {
      httpOnly: true,
      expires: new Date(0),
      path: '/',
      sameSite: 'strict',
    });

    console.log('✅ Logout successful, cookie cleared');
    
    return response;
  } catch (error) {
    console.error('❌ Logout API error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Logout failed',
      },
      { status: 500 }
    );
  }
}
