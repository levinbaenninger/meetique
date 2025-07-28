import { checkout, polar, portal } from '@polar-sh/better-auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { magicLink } from 'better-auth/plugins';

import { db } from '@/db';
import * as schema from '@/db/schema';
import { BETTER_AUTH_URL, TRUSTED_ORIGINS } from '@/lib/env';
import { resend } from '@/lib/mail';
import { polarClient } from '@/lib/polar';

export const auth = betterAuth({
  baseURL: BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      ...schema,
    },
  }),
  trustedOrigins: TRUSTED_ORIGINS,
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        try {
          await resend.emails.send({
            from: 'Meetique <meetique@levinbaenninger.dev>',
            to: email,
            subject: 'Welcome to Meetique - Your magic link',
            text: `Welcome to Meetique! Click the link to securely sign in to your account: ${url}`,
          });
          console.log('Magic link sent to', email);
        } catch (error) {
          console.error('Error sending magic link', error);
        }
      },
    }),
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          authenticatedUsersOnly: true,
          successUrl: '/upgrade',
        }),
        portal(),
      ],
    }),
  ],
});
