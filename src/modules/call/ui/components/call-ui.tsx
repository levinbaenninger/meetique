"use client";

import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { toast } from "sonner";

import { CallActive } from "@/modules/call/ui/components/call-active";
import { CallEnded } from "@/modules/call/ui/components/call-ended";
import { CallLobby } from "@/modules/call/ui/components/call-lobby";

interface Props {
  meetingName: string;
}

export const CallUi = ({ meetingName }: Props) => {
  const call = useCall();
  const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");

  const handleJoin = async () => {
    if (!call) {
      return;
    }

    try {
      await call.join();
      setShow("call");
    } catch {
      toast.error("Failed to join call. Please try again or contact support.");
    }
  };

  const handleLeave = async () => {
    if (!call) {
      return;
    }

    try {
      await call.endCall();
      setShow("ended");
    } catch {
      toast.error("Failed to leave call. Please try again or contact support.");
    }
  };

  return (
    <StreamTheme className="h-full">
      {show === "lobby" && <CallLobby onJoin={handleJoin} />}
      {show === "call" && (
        <CallActive meetingName={meetingName} onLeave={handleLeave} />
      )}
      {show === "ended" && <CallEnded />}
    </StreamTheme>
  );
};
