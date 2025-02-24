import { NextResponse } from "next/server"

if (!process.env.NEXT_PUBLIC_MISTRAL_API_KEY) {
  throw new Error("NEXT_PUBLIC_MISTRAL_API_KEY is not set")
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant specializing in cryptocurrency and stock market knowledge. Provide clear, accurate information and analysis.",
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch from Mistral AI")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 })
  }
}

