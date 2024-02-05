import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

export async function POST(req: Request, res: NextResponse) {
  const body = await req.json();

  if (body && body.messages) {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: body.messages
    });

    const message = completion && completion.choices && completion.choices[0].message;

    return NextResponse.json({ output: message }, { status: 200, statusText: "Success" });
  }
}