export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import NewsEvent from "@/lib/models/NewsEvent";

// Cloudinary v1 import
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//-----------------------------------------
// GET - Fetch all news & events
//-----------------------------------------
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status") || "published";

    const filter: any = { status };
    if (type === "news" || type === "event") {
      filter.type = type;
    }

    const items = await NewsEvent.find(filter).sort({ date: -1 }).lean();

    return NextResponse.json(
      { success: true, data: items },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /news-events error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

//-----------------------------------------
// POST - Create news/event
//-----------------------------------------
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();

    const type = formData.get("type") as string;
    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const fullContent = formData.get("fullContent") as string;
    const date = formData.get("date") as string;
    const rawTime = formData.get('time')
const rawLocation = formData.get('location')

const time = rawTime ? String(rawTime) : undefined
const location = rawLocation ? String(rawLocation) : undefined

    const status = formData.get("status") as string;
    const image = formData.get("image") as File;

    // Validate inputs
    if (!type || !title || !excerpt || !fullContent || !date || !image) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert image to Buffer
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary v1
    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "mis/news-events" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    // Save to DB
    const newItem = await NewsEvent.create({
      type,
      title,
      excerpt,
      fullContent,
      imageUrl: uploadResult.secure_url,
      date: new Date(date),
      time: time || undefined,
      location: location || undefined,
      status: status || "published",
    });

    return NextResponse.json(
      {
        success: true,
        message: `${type === "news" ? "News" : "Event"} created successfully`,
        data: newItem,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /news-events error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create news/event" },
      { status: 500 }
    );
  }
}
