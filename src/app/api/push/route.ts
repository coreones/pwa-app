import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:support@billna.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

let subscriptions: PushSubscriptionJSON[] = []; 

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    await Promise.all(
      subscriptions.map((sub) =>
        webpush
          .sendNotification(sub as any, JSON.stringify(payload))
          .catch(console.error)
      )
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
