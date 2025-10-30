import Image from "next/image";

export const AuthBranding = () => (
  <div className="relative hidden flex-col items-center justify-center gap-y-5 bg-radial from-sidebar-accent to-sidebar md:flex">
    <Image alt="logo" height={92} src="/logo.svg" width={92} />
    <p className="font-semibold text-2xl text-white">Meetique</p>
  </div>
);
