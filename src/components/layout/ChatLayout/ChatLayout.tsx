"use client"

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";


export default function ChatLayout() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hello. How can I help you today?"
    }
  ]);

  const handleSubmit = () => {
    if (!input) return;

    const temp = [...messages];
    temp.push({
      role: "user",
      content: input
    });

    setMessages(temp);
    
    // Reset the textarea and input state
    setInput("");
    
    // Make API call to openai
    makeAPICall(temp);
  }

  const makeAPICall = async (messages: any) => {
    const response = await fetch('/api/chat-completion', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ messages })
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <div className="p-6 shadow border rounded-md">
      <div className="flex flex-col">
        {
          messages.length > 0 && messages.map((message, index) => {
            return (
              <div key={index} className={`w-max max-w-[18rem] rounded-md px-4 py-3 h-min ${
                message.role === "assistant"
                  ? "self-start bg-gray-200 text-gray-800"
                  : "self-end bg-gray-800 text-gray-50"
              } `}>
                {message.content}
              </div>
            )
          })
        }
      </div>
      <div className="mt-8 relative">
        <Textarea onChange={(e) => setInput(e.target.value)} value={input} />
        <div className="absolute top-4 right-4">
          <button onClick={handleSubmit} className="bg-gray-800 text-gray-50 px-4 py-3 rounded">Send</button>
        </div>
      </div>
    </div>
  )
}