import "server-only";

import { StreamClient } from "@stream-io/node-sdk";

import { env } from "@/env";

export const streamVideo = new StreamClient(
  env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY,
  env.STREAM_VIDEO_API_SECRET,
  {
    timeout: 10_000,
  }
);
