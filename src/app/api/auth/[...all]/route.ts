import ip from '@arcjet/ip';
import arcjet, {
  type ArcjetDecision,
  type BotOptions,
  detectBot,
  type EmailOptions,
  protectSignup,
  type ProtectSignupOptions,
  shield,
  slidingWindow,
  type SlidingWindowRateLimitOptions,
} from '@arcjet/next';
import { toNextJsHandler } from 'better-auth/next-js';
import { NextRequest } from 'next/server';

import { auth } from '@/lib/auth';

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ['userId'],
  rules: [
    shield({
      mode: 'LIVE',
    }),
  ],
});

const emailOptions = {
  mode: 'LIVE',
  block: ['DISPOSABLE', 'INVALID', 'NO_MX_RECORDS'],
} satisfies EmailOptions;

const botOptions = {
  mode: 'LIVE',
  allow: [],
} satisfies BotOptions;

const rateLimitOptions = {
  mode: 'LIVE',
  interval: '2m',
  max: 5,
} satisfies SlidingWindowRateLimitOptions<[]>;

const signupOptions = {
  email: emailOptions,
  bots: botOptions,
  rateLimit: rateLimitOptions,
} satisfies ProtectSignupOptions<[]>;

async function protect(req: NextRequest): Promise<ArcjetDecision> {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  let userId: string;
  if (session?.user.id) {
    userId = session.user.id;
  } else {
    userId = ip(req) || '127.0.0.1';
  }

  if (req.nextUrl.pathname.startsWith('/api/auth/sign-up')) {
    const body = await req.clone().json();

    if (typeof body.email === 'string') {
      return aj
        .withRule(protectSignup(signupOptions))
        .protect(req, { email: body.email, userId });
    } else {
      return aj
        .withRule(detectBot(botOptions))
        .withRule(slidingWindow(rateLimitOptions))
        .protect(req, { userId });
    }
  } else {
    return aj.withRule(detectBot(botOptions)).protect(req, { userId });
  }
}

const authHandlers = toNextJsHandler(auth.handler);

export const { GET } = authHandlers;

export const POST = async (req: NextRequest) => {
  const decision = await protect(req);

  console.log('Arcjet Decision:', decision);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return new Response(null, { status: 429 });
    } else if (decision.reason.isEmail()) {
      let message: string;

      if (decision.reason.emailTypes.includes('INVALID')) {
        message = 'Email address format is invalid. Is there a typo?';
      } else if (decision.reason.emailTypes.includes('DISPOSABLE')) {
        message = 'We do not allow disposable email addresses.';
      } else if (decision.reason.emailTypes.includes('NO_MX_RECORDS')) {
        message =
          'Your email domain does not have an MX record. Is there a typo?';
      } else {
        message = 'Invalid email.';
      }

      return Response.json({ message }, { status: 400 });
    } else {
      return new Response(null, { status: 403 });
    }
  }

  return authHandlers.POST(req);
};
