import { NextResponse } from "next/server";
import { StreamClient } from "@stream-io/node-sdk";
import { currentUser } from "@clerk/nextjs/server";

export async function POST() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = new StreamClient(
      process.env.NEXT_PUBLIC_STREAM_API_KEY!,
      process.env.STREAM_SECRET_KEY!
    );

    const token = client.createToken(user.id);

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error: "Token generation failed" }, { status: 500 });
  }
}