"use client";

import React from "react";
import Image from "next/image";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

export const Header = () => {
  return (
    <div className=" lg:static top-0 min-h-0 flex-shrink-0 justify-between z-20 py-4 px-6  flex jsutify-between  ">
      <Image className="dark:invert" src="/think2earn.svg" alt="think2earn" height="10" width="160" />

      <div className="flex flex-row gap-2">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </div>
  );
};
