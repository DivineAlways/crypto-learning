"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

export function AIAssistant() {
  const [query, setQuery] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const elevenlabsWidgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize ElevenLabs widget
    const widget = document.createElement("elevenlabs-convai")
    widget.setAttribute("agent-id", "5V3UCGiQ1CiIhAzzGM5h")

    if (elevenlabsWidgetRef.current) {
      elevenlabsWidgetRef.current.appendChild(widget)
    }

    // Add event listener for question clicks
    const handleQuestionClick = (event: CustomEvent) => {
      const question = event.detail.question
      setQuery(question)
      handleSend(question)
    }

    document.addEventListener("questionClicked", handleQuestionClick as EventListener)

    return () => {
      if (elevenlabsWidgetRef.current) {
        elevenlabsWidgetRef.current.innerHTML = ""
      }
      document.removeEventListener("questionClicked", handleQuestionClick as EventListener)
    }
  }, [])

  const handleSend = async (questionOverride?: string) => {
    const messageToSend = questionOverride || query
    if (!messageToSend.trim() || isLoading) return

    try {
      setIsLoading(true)
      const userMessage: Message = { role: "user", content: messageToSend }
      setMessages((prev) => [...prev, userMessage])

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      if (!response.ok) throw new Error("Failed to fetch response")

      const data = await response.json()

      const assistantMessage: Message = data.choices[0].message
      setMessages((prev) => [...prev, assistantMessage])

      // Trigger ElevenLabs widget to speak the response
      const widget = elevenlabsWidgetRef.current?.querySelector("elevenlabs-convai") as any
      if (widget && widget.speak) {
        widget.speak(assistantMessage.content)
      }
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
      setQuery("")
    }
  }

  return (
    <Card className="mt-8 bg-gray-50 dark:bg-gray-800">
      <CardHeader>
        <CardTitle>AI Assistant</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] bg-white dark:bg-gray-700 rounded-lg mb-4 p-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.role === "user" ? "text-blue-600" : "text-green-600"}`}>
              <span className="font-semibold">{message.role === "user" ? "You: " : "Assistant: "}</span>
              <span className="text-gray-800 dark:text-gray-200">{message.content}</span>
            </div>
          ))}
          {isLoading && <div className="text-gray-500">Assistant is thinking...</div>}
        </div>
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Ask about cryptocurrency or blockchain..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            disabled={isLoading}
          />
          <Button size="icon" onClick={() => handleSend()} disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* ElevenLabs Widget Container */}
        <div ref={elevenlabsWidgetRef} className="mt-4" />
      </CardContent>
    </Card>
  )
}

