import { NextResponse } from "next/server"
import { getTopOfBookPrice } from "@/lib/tiingo"

export async function GET() {
  try {
    // Test with a simple API call for Apple stock
    const data = await getTopOfBookPrice("AAPL")
    return NextResponse.json({
      success: true,
      message: "Successfully connected to Tiingo API",
      data,
    })
  } catch (error) {
    console.error("Tiingo API Error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to connect to Tiingo API",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      },
    )
  }
}

