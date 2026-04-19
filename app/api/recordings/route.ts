import { NextResponse } from "next/server";
import { StreamClient } from "@stream-io/node-sdk";

export async function GET() {
  try {
    const client = new StreamClient(
      process.env.NEXT_PUBLIC_STREAM_API_KEY!,
      process.env.STREAM_SECRET_KEY!
    );

    // ✅ Correct way to query calls from backend
    const response = await client.video.queryCalls({
      filter_conditions: {},
      sort: [{ field: "created_at", direction: -1 }],
    });

    const calls = response.calls;

    // ✅ Extract recordings safely
    const recordings = calls.flatMap((call: any) =>
      call.recordings ?? []
    );

    return NextResponse.json(recordings);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch recordings" },
      { status: 500 }
    );
  }
}