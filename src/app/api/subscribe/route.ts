import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

let subscriptions: PushSubscriptionJSON[] = [];

export async function POST(req: NextRequest) {
  try {
    const sub = await req.json();
    if (!subscriptions.some((s) => s.endpoint === sub.endpoint))
      subscriptions.push(sub);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
