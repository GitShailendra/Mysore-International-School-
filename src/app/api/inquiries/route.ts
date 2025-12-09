import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Inquiry from '@/lib/models/Inquiry';
import { verifyAuth } from '@/lib/middleware/auth';

// POST - Create new inquiry (Public)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { studentName, parentName, email, phone, occupation, category, message, source } = body;

    // Validate required fields
    if (!studentName || !parentName || !phone || !occupation) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please provide all required fields',
        },
        { status: 400 }
      );
    }

    // Create inquiry
    const inquiry = await Inquiry.create({
      studentName,
      parentName,
      email,
      phone,
      occupation,
      category: category || 'Admission',
      message,
      source: source || 'Website',
      status: 'New',
      remarks: 'No remarks',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry submitted successfully',
        data: inquiry,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create inquiry error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to submit inquiry',
      },
      { status: 500 }
    );
  }
}

// GET - Get all inquiries (Protected - Admin only)
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request);
    if ('error' in authResult) {
      return NextResponse.json(
        { success: false, message: authResult.error },
        { status: authResult.status }
      );
    }

    await connectDB();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const sort = searchParams.get('sort') || 'newest';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '15');

    // Build query
    const query: any = {};
    if (status && status !== 'All') {
      query.status = status;
    }

    // Sort options
    const sortOptions: any = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
    };

    // Get total count for pagination
    const total = await Inquiry.countDocuments(query);

    // Get inquiries
    const inquiries = await Inquiry.find(query)
      .sort(sortOptions[sort] || sortOptions.newest)
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    // Get status counts
    const stats = await Inquiry.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const statusCounts = {
      all: total,
      new: 0,
      contacted: 0,
      notResponding: 0,
      followUp: 0,
      enrolled: 0,
      rejected: 0,
    };

    stats.forEach((stat) => {
      const status = stat._id.toLowerCase().replace(' ', '');
      if (status === 'new') statusCounts.new = stat.count;
      else if (status === 'contacted') statusCounts.contacted = stat.count;
      else if (status === 'notresponding') statusCounts.notResponding = stat.count;
      else if (status === 'followup') statusCounts.followUp = stat.count;
      else if (status === 'enrolled') statusCounts.enrolled = stat.count;
      else if (status === 'rejected') statusCounts.rejected = stat.count;
    });

    return NextResponse.json(
      {
        success: true,
        data: inquiries,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
        stats: statusCounts,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get inquiries error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to fetch inquiries',
      },
      { status: 500 }
    );
  }
}
