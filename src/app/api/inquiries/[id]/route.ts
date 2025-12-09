import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Inquiry from '@/lib/models/Inquiry';
import { verifyAuth } from '@/lib/middleware/auth';

// GET - Get single inquiry
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ Fixed for Next.js 15
) {
  try {
    // ✅ Await params in Next.js 15
    const { id } = await context.params;
    
    console.log('🔍 GET Inquiry - ID:', id);

    const authResult = await verifyAuth(request);
    if ('error' in authResult) {
      console.log('❌ Auth failed:', authResult.error);
      return NextResponse.json(
        { success: false, message: authResult.error },
        { status: authResult.status }
      );
    }

    await connectDB();

    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      console.log('❌ Inquiry not found:', id);
      return NextResponse.json(
        { success: false, message: 'Inquiry not found' },
        { status: 404 }
      );
    }

    console.log('✅ Inquiry found:', inquiry._id);

    return NextResponse.json({
      success: true,
      data: inquiry,
    });
  } catch (error: any) {
    console.error('❌ Get inquiry error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to fetch inquiry',
      },
      { status: 500 }
    );
  }
}

// PATCH - Update inquiry (status, remarks)
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ Fixed for Next.js 15
) {
  try {
    // ✅ Await params in Next.js 15
    const { id } = await context.params;
    
    console.log('📝 PATCH Inquiry - ID:', id);

    const authResult = await verifyAuth(request);
    if ('error' in authResult) {
      console.log('❌ Auth failed:', authResult.error);
      return NextResponse.json(
        { success: false, message: authResult.error },
        { status: authResult.status }
      );
    }

    await connectDB();

    const body = await request.json();
    const { status, remarks } = body;

    console.log('📦 Update data:', { status, remarks });

    const updateData: any = {};
    if (status !== undefined) updateData.status = status;
    if (remarks !== undefined) updateData.remarks = remarks;

    console.log('🔄 Updating inquiry:', id, 'with:', updateData);

    const inquiry = await Inquiry.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      console.log('❌ Inquiry not found:', id);
      return NextResponse.json(
        { success: false, message: 'Inquiry not found' },
        { status: 404 }
      );
    }

    console.log('✅ Inquiry updated successfully:', inquiry._id);

    return NextResponse.json({
      success: true,
      message: 'Inquiry updated successfully',
      data: inquiry,
    });
  } catch (error: any) {
    console.error('❌ Update inquiry error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to update inquiry',
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete inquiry
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // ✅ Fixed for Next.js 15
) {
  try {
    // ✅ Await params in Next.js 15
    const { id } = await context.params;
    
    console.log('🗑️ DELETE Inquiry - ID:', id);

    const authResult = await verifyAuth(request);
    if ('error' in authResult) {
      console.log('❌ Auth failed:', authResult.error);
      return NextResponse.json(
        { success: false, message: authResult.error },
        { status: authResult.status }
      );
    }

    await connectDB();

    console.log('🔍 Finding and deleting inquiry:', id);

    const inquiry = await Inquiry.findByIdAndDelete(id);

    if (!inquiry) {
      console.log('❌ Inquiry not found:', id);
      return NextResponse.json(
        { success: false, message: 'Inquiry not found' },
        { status: 404 }
      );
    }

    console.log('✅ Inquiry deleted successfully:', inquiry._id);

    return NextResponse.json({
      success: true,
      message: 'Inquiry deleted successfully',
    });
  } catch (error: any) {
    console.error('❌ Delete inquiry error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to delete inquiry',
      },
      { status: 500 }
    );
  }
}
