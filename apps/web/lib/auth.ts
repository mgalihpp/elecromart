import { db } from '@repo/db';
import { getBaseUrl } from '@repo/ui/lib/utils';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin } from 'better-auth/plugins';
import type { NextRequest } from 'next/server';
import { sendEmail } from '@/actions/send-email';

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, _request) => {
      await sendEmail({
        to: user.email,
        subject: 'Reset your password',
        text: url,
        type: 'reset-password',
      });
    },
    onPasswordReset: async ({ user }, _request) => {
      // You can perform actions after a password reset here
      console.log(`Password reset for user: ${user.email}`);
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, _request) => {
      await sendEmail({
        to: user.email,
        subject: 'Verify your email address',
        text: url,
        type: 'verify-email',
      });
    },
  },
  plugins: [admin()],
});

type Session = typeof auth.$Infer.Session;

export const getSessionForMiddleware = async (req: NextRequest) => {
  const res = await fetch(`${getBaseUrl()}/api/auth/get-session`, {
    headers: {
      cookie: req.headers.get('cookie') || '', // Forward the cookies from the request
    },
  });

  const data = (await res.json()) as Session;

  return data;
};
