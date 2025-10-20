"use server";

import { getBaseUrl } from "@repo/ui/lib/utils";

type SendEmailParams = {
  to: string;
  subject: string;
  text: string;
};

export const sendEmail = async ({ to, subject, text }: SendEmailParams) => {
  const response = await fetch(`${getBaseUrl()}/api/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ to, subject, text }),
  });

  if (!response.ok) {
    throw new Error(`Failed to send email: ${await response.json()}`);
  }

  return await response.json();
};
