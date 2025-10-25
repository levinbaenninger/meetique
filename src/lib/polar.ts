import { Polar } from '@polar-sh/sdk';

const isSandbox = process.env.POLAR_SERVER === 'sandbox';
const server = isSandbox ? 'sandbox' : 'production';
const accessToken = isSandbox
  ? process.env.POLAR_ACCESS_TOKEN_SANDBOX
  : process.env.POLAR_ACCESS_TOKEN;
if (!accessToken) {
  throw new Error(
    `[polar] Missing ${isSandbox ? 'POLAR_ACCESS_TOKEN_SANDBOX' : 'POLAR_ACCESS_TOKEN'} for ${server} environment`,
  );
}

export const polarClient = new Polar({
  accessToken,
  server,
});
