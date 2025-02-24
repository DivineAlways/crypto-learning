import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-4">
        <div className="flex items-center justify-between max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-purple-400">Crypto Learning Hub</div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search cryptocurrencies"
                className="w-[200px] pl-8 bg-gray-800 border-gray-700"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500/10">
              Sign-up
            </Button>
            <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500/10">
              Login
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-4 gap-4">
          {/* Crypto Charts */}
          <Card className="col-span-1 bg-[#2a2a40] p-4">
            <h3 className="text-lg mb-2">Bitcoin (BTC)</h3>
            <div className="text-green-500 text-xl">+2.34%</div>
            <div className="h-[100px] bg-green-500/20 rounded mt-2" />
          </Card>
          <Card className="col-span-1 bg-[#2a2a40] p-4">
            <h3 className="text-lg mb-2">Ethereum (ETH)</h3>
            <div className="text-red-500 text-xl">-1.27%</div>
            <div className="h-[100px] bg-red-500/20 rounded mt-2" />
          </Card>
          <Card className="col-span-1 bg-[#2a2a40] p-4">
            <h3 className="text-lg mb-2">Cardano (ADA)</h3>
            <div className="text-green-500 text-xl">+0.89%</div>
            <div className="h-[100px] bg-green-500/20 rounded mt-2" />
          </Card>
          <Card className="col-span-1 bg-[#2a2a40] p-4">
            <h3 className="text-lg mb-2">Top Gainers/Losers</h3>
            <ScrollArea className="h-[150px]">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Solana (SOL)</span>
                  <span className="text-green-500">+5.67%</span>
                </div>
                <div className="flex justify-between">
                  <span>Polkadot (DOT)</span>
                  <span className="text-red-500">-3.21%</span>
                </div>
                <div className="flex justify-between">
                  <span>Chainlink (LINK)</span>
                  <span className="text-green-500">+2.45%</span>
                </div>
                <div className="flex justify-between">
                  <span>Uniswap (UNI)</span>
                  <span className="text-red-500">-1.98%</span>
                </div>
                <div className="flex justify-between">
                  <span>Avalanche (AVAX)</span>
                  <span className="text-green-500">+4.12%</span>
                </div>
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* Featured Story */}
        <Card className="mt-4 bg-[#2a2a40] p-6">
          <h2 className="text-xl font-bold mb-4">FEATURED STORY</h2>
          <div className="flex gap-4">
            <img
              src={`https://sjc.microlink.io/ZbDVSH7d9JkIObOdo5qWgC04IB0Sw7bUJxc2AAlsgf-r58dJFxFARUMpx9p2xOZ78eaUbKE73K29H65lpck5hg.jpeg`}
              alt="Featured story"
              className="w-32 h-32 object-cover rounded"
            />
            <div>
              <h3 className="text-green-400 text-lg font-semibold mb-2">
                Major Crypto Exchange Announces New DeFi Integration
              </h3>
              <p className="text-gray-400">
                Leading cryptocurrency exchange unveils plans to integrate decentralized finance (DeFi) protocols,
                potentially revolutionizing the crypto trading landscape
              </p>
              <div className="text-sm text-gray-500 mt-2">8:12 PM | February 23, 2025</div>
            </div>
          </div>
        </Card>

        {/* News and Blogs */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Card className="bg-[#2a2a40] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">CRYPTO NEWS</h2>
              <Button variant="ghost" size="icon">
                ⚙️
              </Button>
            </div>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {/* News items would go here */}
                <div className="flex gap-2">
                  <img
                    src={`https://sjc.microlink.io/ZbDVSH7d9JkIObOdo5qWgC04IB0Sw7bUJxc2AAlsgf-r58dJFxFARUMpx9p2xOZ78eaUbKE73K29H65lpck5hg.jpeg`}
                    alt="News thumbnail"
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="text-green-400">Bitcoin Surpasses $100,000 Mark for the First Time</h4>
                    <p className="text-sm text-gray-400">Feb-23 20:09 PM | cryptonews.com</p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </Card>
          <Card className="bg-[#2a2a40] p-6">
            <h2 className="text-xl font-bold mb-4">CRYPTO BLOGS</h2>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {/* Blog items would go here */}
                <div className="flex gap-2">
                  <img
                    src={`https://sjc.microlink.io/ZbDVSH7d9JkIObOdo5qWgC04IB0Sw7bUJxc2AAlsgf-r58dJFxFARUMpx9p2xOZ78eaUbKE73K29H65lpck5hg.jpeg`}
                    alt="Blog thumbnail"
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="text-green-400">The Future of DeFi: Trends to Watch in 2025 and Beyond</h4>
                    <p className="text-sm text-gray-400">Feb-23 19:00 PM | defiinsider.com</p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </Card>
        </div>
      </main>
    </div>
  )
}

