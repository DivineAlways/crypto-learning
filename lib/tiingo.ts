const TIINGO_API_BASE = "https://api.tiingo.com/v2"

if (!process.env.TIINGO_API_KEY) {
  throw new Error("TIINGO_API_KEY is not set in environment variables")
}

export async function getPrice(symbol: string) {
  try {
    let endpoint = `${TIINGO_API_BASE}/iex/${symbol}`

    // Check if it's a crypto symbol
    if (symbol.includes("-")) {
      endpoint = `${TIINGO_API_BASE}/tiingo/crypto/prices?tickers=${symbol}`
    }

    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Token ${process.env.TIINGO_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return Array.isArray(data) ? data[0] : data
  } catch (error) {
    console.error("API Error:", error)
    throw error
  }
}

export async function getMetaData(symbol: string) {
  try {
    const response = await fetch(`${TIINGO_API_BASE}/stock/symbols/${symbol}/details`, {
      headers: {
        Authorization: `Token ${process.env.TIINGO_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Metadata API Error:", error)
    throw error
  }
}

export async function getHistoricalData(symbol: string, startDate: string, endDate: string) {
  try {
    const response = await fetch(
      `${TIINGO_API_BASE}/tiingo/daily/${symbol}/prices?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Token ${process.env.TIINGO_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Historical Data API Error:", error)
    throw error
  }
}

export async function getTicker(ticker: string) {
  try {
    const response = await fetch(`${TIINGO_API_BASE}/tiingo/daily/${ticker}`, {
      headers: {
        Authorization: `Token ${process.env.TIINGO_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Ticker API Error:", error)
    throw error
  }
}

export async function getTopOfBookPrice(symbol: string) {
  try {
    const response = await fetch(`${TIINGO_API_BASE}/iex/${symbol}`, {
      headers: {
        Authorization: `Token ${process.env.TIINGO_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Top of Book API Error:", error)
    throw error
  }
}

