import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// OPTIONAL, BUT RECOMMENDED
export const runtime = "edge";

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

export async function POST(req: Request, res: NextResponse) {
  const body = await req.json();

  if (body && body.messages) {
    const completionResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: body.messages,
    });

    return NextResponse.json({ output: completionResponse.choices[0].message }, {  status: 200 });
  }
}