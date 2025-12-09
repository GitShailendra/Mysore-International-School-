import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Event from '@/lib/models/Event'
import { uploadImage, uploadMultipleImages, deleteImage } from '@/lib/uploadToCloudinary'

// ✅ Define the valid categories type
type EventCategory = 'Cultural' | 'Sports' | 'Academic' | 'National' | 'Festival' | 'Competition'

// GET - Fetch single event
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const event = await Event.findById(params.id)

    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: event,
    })
  } catch (error) {
    console.error('GET event error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch event' },
      { status: 500 }
    )
  }
}

// PUT - Update event
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const event = await Event.findById(params.id)

    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      )
    }

    const formData = await request.formData()

    // Extract form fields
    const title = formData.get('title') as string
    const date = formData.get('date') as string
    const category = formData.get('category') as EventCategory // ✅ Type assertion
    const description = formData.get('description') as string
    const driveLink = formData.get('driveLink') as string
    const thumbnail = formData.get('thumbnail') as File | null
    
    // Extract gallery images
    const newGalleryImages: File[] = []
    let index = 0
    while (formData.has(`galleryImage${index}`)) {
      const file = formData.get(`galleryImage${index}`) as File
      if (file && file.size > 0) {
        newGalleryImages.push(file)
      }
      index++
    }

    // Update basic fields
    if (title) event.title = title
    if (date) event.date = new Date(date)
    if (category) event.category = category
    if (description) event.description = description
    if (driveLink) event.driveLink = driveLink

    // Update thumbnail if new one provided
    if (thumbnail && thumbnail.size > 0) {
      // Delete old thumbnail
      await deleteImage(event.thumbnail.public_id)
      // Upload new thumbnail
      const thumbnailResult = await uploadImage(thumbnail, 'events/thumbnails')
      event.thumbnail = thumbnailResult
    }

    // Update gallery images if new ones provided
    if (newGalleryImages.length > 0) {
      // Delete old gallery images
      for (const image of event.galleryImages) {
        await deleteImage(image.public_id)
      }
      // Upload new gallery images
      const galleryResults = await uploadMultipleImages(newGalleryImages, 'events/gallery')
      event.galleryImages = galleryResults
    }

    await event.save()

    return NextResponse.json({
      success: true,
      message: 'Event updated successfully',
      data: event,
    })
  } catch (error: any) {
    console.error('PUT event error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update event' },
      { status: 500 }
    )
  }
}

// DELETE - Delete event
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const event = await Event.findById(params.id)

    if (!event) {
      return NextResponse.json(
        { success: false, message: 'Event not found' },
        { status: 404 }
      )
    }

    // Delete thumbnail from Cloudinary
    await deleteImage(event.thumbnail.public_id)

    // Delete gallery images from Cloudinary
    for (const image of event.galleryImages) {
      await deleteImage(image.public_id)
    }

    // Delete event from database
    await Event.findByIdAndDelete(params.id)

    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully',
    })
  } catch (error) {
    console.error('DELETE event error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete event' },
      { status: 500 }
    )
  }
}
