import { db } from '@repo/db';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin } from 'better-auth/plugins';
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
      });
    },
  },
  plugins: [admin()],
});
