import { NextResponse } from "next/server";

export const runtime = "nodejs";
const TOPICS = new Set(["Product inquiry", "Order support", "Shipping & returns", "Routine guidance", "Partnerships", "Other"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const data = await request.json();
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const topic = String(data.topic || "").trim();
    const orderNumber = String(data.orderNumber || "").trim();
    const message = String(data.message || "").trim();
    if (!name || name.length > 120 || !emailPattern.test(email) || email.length > 254 || !TOPICS.has(topic) || orderNumber.length > 80 || message.length < 10 || message.length > 5000 || data.privacyAcknowledged !== "yes") {
      return NextResponse.json({ success: false, message: "Please complete all required fields correctly." }, { status: 400 });
    }

    // A delivery provider is required before the form can send emails.
    // This intentionally returns an error rather than pretending a message was sent.
    return NextResponse.json({
      success: false,
      message: "Contact delivery isn't configured yet. Please connect your email service before publishing this form.",
    }, { status: 503 });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }
}
