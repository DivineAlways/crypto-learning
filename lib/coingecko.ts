const COINGECKO_API_BASE = "https://api.coingecko.com/api/v3"

export async function getCryptoPrice(coinId: string) {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true`,
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data[coinId]
  } catch (error) {
    console.error("CoinGecko API Error:", error)
    throw error
  }
}

export async function getCryptoMetadata(coinId: string) {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/${coinId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`,
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return {
      name: data.name,
      symbol: data.symbol.toUpperCase(),
    }
  } catch (error) {
    console.error("CoinGecko API Error:", error)
    throw error
  }
}

export async function getHistoricalCryptoData(coinId: string, days: number) {
  try {
    const response = await fetch(`${COINGECKO_API_BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.prices.map((item: [number, number]) => ({
      date: new Date(item[0]).toISOString().split("T")[0],
      price: item[1],
    }))
  } catch (error) {
    console.error("CoinGecko Historical Data Error:", error)
    throw error
  }
}

