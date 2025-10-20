import type { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest, _res: NextResponse) {
  const body = await req.json();
  const { to, subject, text, type } = body;

  try {
    const { data, error } = await resend.emails.send({
      from: "Elecromart <onboarding@resend.dev>",
      to,
      subject,
      react: EmailTemplate({ url: text, type }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
