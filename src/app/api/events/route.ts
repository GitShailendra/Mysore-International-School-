import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db';
import Event from '@/lib/models/Event'
import { uploadImage, uploadMultipleImages, deleteImage } from '@/lib/uploadToCloudinary'

// GET - Fetch all events
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '10')
    const page = parseInt(searchParams.get('page') || '1')

    const query = category ? { category } : {}

    const events = await Event.find(query)
      .sort({ date: -1, createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)

    const total = await Event.countDocuments(query)

    return NextResponse.json({
      success: true,
      data: events,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('GET events error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

// POST - Create new event
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const formData = await request.formData()

    // Extract form fields
    const title = formData.get('title') as string
    const date = formData.get('date') as string | null
    const category = formData.get('category') as string
    const description = formData.get('description') as string
    const driveLink = formData.get('driveLink') as string | null
    const thumbnail = formData.get('thumbnail') as File
    
    // Extract gallery images
    const galleryImages: File[] = []
    let index = 0
    while (formData.has(`galleryImage${index}`)) {
      const file = formData.get(`galleryImage${index}`) as File
      if (file && file.size > 0) {
        galleryImages.push(file)
      }
      index++
    }

    // Validate required fields only (removed date and driveLink)
    if (!title || !category || !description) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!thumbnail) {
      return NextResponse.json(
        { success: false, message: 'Thumbnail image is required' },
        { status: 400 }
      )
    }

    if (galleryImages.length < 4 || galleryImages.length > 12) {
      return NextResponse.json(
        { success: false, message: 'Please upload 4-12 gallery images' },
        { status: 400 }
      )
    }

    // Upload thumbnail
    const thumbnailResult = await uploadImage(thumbnail, 'events/thumbnails')

    // Upload gallery images
    const galleryResults = await uploadMultipleImages(galleryImages, 'events/gallery')

    // Create event object with optional fields
    const eventData: any = {
      title,
      category,
      description,
      thumbnail: thumbnailResult,
      galleryImages: galleryResults,
    }

    // Add optional fields only if provided
    if (date) {
      eventData.date = new Date(date)
    }
    
    if (driveLink) {
      eventData.driveLink = driveLink
    }

    // Create event
    const event = await Event.create(eventData)

    return NextResponse.json({
      success: true,
      message: 'Event created successfully',
      data: event,
    })
  } catch (error: any) {
    console.error('POST event error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create event' },
      { status: 500 }
    )
  }
}
