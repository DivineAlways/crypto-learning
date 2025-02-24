import { NextResponse } from "next/server"
import { getTicker } from "@/lib/tiingo"

export async function GET() {
  try {
    const data = await getTicker("AAPL")
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch data from Tiingo" }, { status: 500 })
  }
}

