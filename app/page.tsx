import { Suspense } from "react"
import { MarketOverview } from "@/components/market-overview"
import { KnowledgeBase } from "@/components/knowledge-base"
import { AIAssistant } from "@/components/ai-assistant"
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">Crypto Learning Hub</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Suspense fallback={<div>Loading market data...</div>}>
            <MarketOverview />
          </Suspense>
          <KnowledgeBase />
        </div>
        <AIAssistant />
      </main>
    </div>
  )
}

