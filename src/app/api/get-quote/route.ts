import { NextResponse } from "next/server";
import { Resend } from "resend";
import { sendWhatsAppNotification } from "@/lib/notify";

export const runtime = "nodejs";

const TO_EMAIL = "Sales.Aggarwalindustries@gmail.com";
const FROM_EMAIL = "Aggarwal Industries Website <onboarding@resend.dev>";

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const { name, email, phone, content } = await req.json();

  if (!name || !email || !phone || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Quote Request from ${name}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Details:</strong></p>
        <p>${String(content).replace(/\n/g, "<br/>")}</p>
      `,
    });

    await sendWhatsAppNotification(
      `New quote request from ${name}.\nPhone: ${phone}\nEmail: ${email}\n\n${content}`
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Get quote email failed", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
