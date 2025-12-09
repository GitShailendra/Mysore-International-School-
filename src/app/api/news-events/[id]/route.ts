import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import NewsEvent from '@/lib/models/NewsEvent'

// GET - Fetch single news/event
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const newsEvent = await NewsEvent.findById(params.id)

    if (!newsEvent) {
      return NextResponse.json(
        { success: false, message: 'News/Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: newsEvent
    })
  } catch (error) {
    console.error('Error fetching news/event:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch news/event' },
      { status: 500 }
    )
  }
}

// PUT - Update news/event
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const image = formData.get('image') as File | null

    const updateData: any = {
      type,
      title,
      excerpt,
      fullContent,
      date: new Date(date),
      time: time || undefined,
      location: location || undefined,
      status
    }

    // If new image is uploaded
    if (image) {
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

      updateData.imageUrl = uploadResult.secure_url
    }

    const newsEvent = await NewsEvent.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    )

    if (!newsEvent) {
      return NextResponse.json(
        { success: false, message: 'News/Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'News/Event updated successfully',
      data: newsEvent
    })
  } catch (error) {
    console.error('Error updating news/event:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update news/event' },
      { status: 500 }
    )
  }
}

// DELETE - Delete news/event
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const newsEvent = await NewsEvent.findByIdAndDelete(params.id)

    if (!newsEvent) {
      return NextResponse.json(
        { success: false, message: 'News/Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'News/Event deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting news/event:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete news/event' },
      { status: 500 }
    )
  }
}
