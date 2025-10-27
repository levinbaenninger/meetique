import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { GeneratedAvatar } from "@/components/generated-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";

export const DashboardUserButton = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { data: session, isPending } = authClient.useSession();

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  if (isPending || !session?.user) {
    return null;
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="flex w-full items-center justify-between overflow-hidden rounded-lg border border-border/10 bg-white/5 p-3 hover:bg-white/10">
          {session.user.image ? (
            <Avatar className="mr-3 size-9">
              <AvatarImage src={session.user.image} />
            </Avatar>
          ) : (
            <GeneratedAvatar
              className="mr-3 size-9"
              seed={session.user.name}
              variant="initials"
            />
          )}
          <div className="flex min-w-0 flex-1 flex-col gap-0.5 overflow-hidden text-left">
            <p className="w-full truncate text-sm">{session.user.name}</p>
            <p className="w-full truncate text-muted-foreground text-xs">
              {session.user.email}
            </p>
          </div>
          <ChevronDownIcon className="size-4 shrink-0" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{session.user.name}</DrawerTitle>
            <DrawerDescription>{session.user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              onClick={() => authClient.customer.portal()}
              variant="outline"
            >
              <CreditCardIcon className="size-4" />
              <span>Billing</span>
            </Button>
            <Button onClick={onLogout} variant="outline">
              <LogOutIcon className="size-4" />
              <span>Log Out</span>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center justify-between overflow-hidden rounded-lg border border-border/10 bg-white/5 p-3 hover:bg-white/10">
        {session.user.image ? (
          <Avatar className="mr-3 size-9">
            <AvatarImage src={session.user.image} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            className="mr-3 size-9"
            seed={session.user.name}
            variant="initials"
          />
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5 overflow-hidden text-left">
          <p className="w-full truncate text-sm">{session.user.name}</p>
          <p className="w-full truncate text-muted-foreground text-xs">
            {session.user.email}
          </p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72" side="right">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium text-sm">{session.user.name}</span>
            <span className="text-muted-foreground text-xs">
              {session.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex cursor-pointer items-center justify-between"
          onClick={() => authClient.customer.portal()}
        >
          <span>Billing</span>
          <CreditCardIcon className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex cursor-pointer items-center justify-between"
          onClick={onLogout}
        >
          <span>Log Out</span>
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
