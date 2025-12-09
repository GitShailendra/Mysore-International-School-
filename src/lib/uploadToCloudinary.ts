import cloudinary from './cloudinary'

export async function uploadImage(
  file: File,
  folder: string = 'events'
): Promise<{ public_id: string; url: string }> {
  try {
    // Convert File to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataURI = `data:${file.type};base64,${base64}`

    // ✅ Upload to Cloudinary WITHOUT upload preset (using API credentials)
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: `mis/${folder}`,
      resource_type: 'auto',
      transformation: [
        { width: 1200, height: 800, crop: 'limit' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' },
      ],
    })

    return {
      public_id: result.public_id,
      url: result.secure_url,
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw new Error('Failed to upload image to Cloudinary')
  }
}

export async function deleteImage(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    throw new Error('Failed to delete image from Cloudinary')
  }
}

export async function uploadMultipleImages(
  files: File[],
  folder: string = 'events'
): Promise<Array<{ public_id: string; url: string }>> {
  try {
    const uploadPromises = files.map((file) => uploadImage(file, folder))
    return await Promise.all(uploadPromises)
  } catch (error) {
    console.error('Multiple upload error:', error)
    throw new Error('Failed to upload multiple images')
  }
}
