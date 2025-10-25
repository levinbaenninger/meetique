"use client";

import {
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
  SearchIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { DashboardCommand } from "@/modules/dashboard/ui/components/dashboard-command";

export const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className="flex items-center gap-x-2 border-b bg-background px-4 py-3">
        <Button className="size-9" onClick={toggleSidebar} variant="outline">
          {state === "collapsed" || isMobile ? (
            <PanelLeftOpenIcon className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>
        <Button
          className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
          onClick={() => setCommandOpen(true)}
          size="sm"
          variant="outline"
        >
          <SearchIcon />
          <span className="text-sm">Search</span>
          <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-muted-foreground text-xs">
            <span>&#8984;</span>K
          </kbd>
        </Button>
      </nav>
    </>
  );
};
