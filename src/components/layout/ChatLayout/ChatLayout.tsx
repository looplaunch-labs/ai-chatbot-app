"use client"

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "@tanstack/react-query";

type MessageType = {
  role: string,
  content: string
}

export default function ChatLayout() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hello. How can I help you today?"
    }
  ]);

  const makeAPICall = async (messages: any) => {
    const response =  await fetch('/api/chat-completion', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ messages })
    });
    return response.json();
  }

  const sendMessageMutation = useMutation({
    mutationFn: (messages: MessageType[]) => {
      return makeAPICall(messages)
    },
    onSuccess: (data) => {
      console.log("MUTATION", data);
      const assistantMessage = data && data.output;
      setMessages((prev) => ([...prev, assistantMessage]));
    }
  });

  const handleSubmit = () => {
    if (!input) return;

    const newMessage: MessageType = {
      role: "user",
      content: input
    };

    const temp = [...messages];
    temp.push(newMessage);

    setMessages(temp);
    
    // Reset the textarea and input state
    setInput("");
    
    // Make API call to openai
    sendMessageMutation.mutate(temp);
  }

  return (
    <div className="p-6 border rounded-md">
      <div className="flex flex-col">
        {
          messages.length > 0 && messages.map((message, index) => {
            return (
              <div key={index} className={`w-max max-w-[350px] rounded-md px-4 py-3 h-min ${
                message.role === "assistant"
                  ? "self-start bg-gray-200 text-gray-800"
                  : "self-end bg-gray-800 text-gray-50"
              }`}>
                {message.content}
              </div>
            )
          })
        }
        {
          sendMessageMutation.isPending && (
            <div className="w-max max-w-[350px] rounded-md px-4 py-3 h-min self-start">
              <Skeleton className="h-8 w-[300px]" />
              <Skeleton className="h-8 w-[150px] mt-2" />
            </div>
          )
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