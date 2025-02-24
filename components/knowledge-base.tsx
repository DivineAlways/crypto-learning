"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { useState } from "react"

const knowledgeItems = [
  {
    title: "Cryptocurrency Basics",
    questions: [
      "What is cryptocurrency?",
      "How does blockchain technology work?",
      "What are the most popular cryptocurrencies?",
      "What is the difference between coins and tokens?",
    ],
  },
  {
    title: "Getting Started",
    questions: [
      "How do I buy and sell cryptocurrencies?",
      "What is a cryptocurrency wallet and how do I choose one?",
      "What should I know about cryptocurrency exchanges?",
      "How do I secure my cryptocurrency investments?",
    ],
  },
  {
    title: "Advanced Concepts",
    questions: [
      "What is mining and how does it work?",
      "Can you explain staking in cryptocurrency?",
      "What is yield farming in DeFi?",
      "What are smart contracts and how do they work?",
    ],
  },
  {
    title: "Earning Opportunities",
    questions: [
      "What are cryptocurrency airdrops?",
      "How can I earn passive income with cryptocurrencies?",
      "What is crypto trading and how do I start?",
      "What are the risks and rewards of mining cryptocurrencies?",
    ],
  },
  {
    title: "Market and Trends",
    questions: [
      "What factors influence cryptocurrency prices?",
      "What is the future of cryptocurrency and blockchain technology?",
      "How do regulations affect the cryptocurrency market?",
      "What are some emerging trends in the crypto space?",
    ],
  },
]

export function KnowledgeBase() {
  const [, setSelectedQuestion] = useState<string | null>(null)

  const handleQuestionClick = (question: string) => {
    setSelectedQuestion(question)
    const event = new CustomEvent("questionClicked", { detail: { question } })
    document.dispatchEvent(event)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Knowledge Base</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {knowledgeItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-4 space-y-2">
                  {item.questions.map((question, qIndex) => (
                    <li
                      key={qIndex}
                      className="text-sm hover:text-blue-500 cursor-pointer"
                      onClick={() => handleQuestionClick(question)}
                    >
                      {question}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}

