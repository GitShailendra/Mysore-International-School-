import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import NewsEvent from '@/lib/models/NewsEvent'

// GET - Fetch all news and events
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'news' or 'event'
    const status = searchParams.get('status') || 'published'

    const filter: any = { status }
    if (type && (type === 'news' || type === 'event')) {
      filter.type = type
    }

    const newsEvents = await NewsEvent.find(filter)
      .sort({ date: -1 })
      .lean()

    return NextResponse.json({
      success: true,
      data: newsEvents
    })
  } catch (error) {
    console.error('Error fetching news/events:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch news and events' },
      { status: 500 }
    )
  }
}

// POST - Create new news or event
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const formData = await request.formData()
    
    const type = formData.get('type') as string
    const title = formData.get('title') as string
    const excerpt = formData.get('excerpt') as string
    const fullContent = formData.get('fullContent') as string
    const date = formData.get('date') as string
    const time = formData.get('time') as string
    const location = formData.get('location') as string
    const status = formData.get('status') as string
    const image = formData.get('image') as File

    // Validation
    if (!type || !title || !excerpt || !fullContent || !date || !image) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Upload image to Cloudinary
    const arrayBuffer = await image.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    const cloudinary = require('cloudinary').v2
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    })

    const uploadResult: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'mis/news-events' },
        (error: any, result: any) => {
          if (error) reject(error)
          else resolve(result)
        }
      )
      uploadStream.end(buffer)
    })

    // Create news/event
    const newsEvent = await NewsEvent.create({
      type,
      title,
      excerpt,
      fullContent,
      imageUrl: uploadResult.secure_url,
      date: new Date(date),
      time: time || undefined,
      location: location || undefined,
      status: status || 'published'
    })

    return NextResponse.json({
      success: true,
      message: `${type === 'news' ? 'News' : 'Event'} created successfully`,
      data: newsEvent
    })
  } catch (error) {
    console.error('Error creating news/event:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create news/event' },
      { status: 500 }
    )
  }
}
