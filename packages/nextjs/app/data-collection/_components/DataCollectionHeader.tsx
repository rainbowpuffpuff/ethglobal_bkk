"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CloseButton from "./CloseButton";
import NavigationButton from "./NavigationButton";

export const DataCollectionHeader = ({
  next,
  back,
  bountyName,
  totalSteps,
  currentStep,
}: {
  next: () => void;
  back: () => void;
  bountyName: string;
  totalSteps: number;
  currentStep: number;
}) => {
  const router = useRouter();

  const handleClose = () => {
    router.push("/");
  };

  return (
    <div className="flex justify-between items-center mb-4 w-full  border-t border-b border-gray-200 p-4">
      <div className="flex gap-2 w-[200px] items-start">
        <CloseButton onClick={handleClose} />

        <NavigationButton onClick={back} text="Back" />
      </div>

      <div className="text-xl font-bold">{bountyName}</div>

      <div className="flex gap-4 items-center justify-end w-[200px]">
        <div className="">
          Step {currentStep} of {totalSteps}
        </div>
        <NavigationButton onClick={next} text="Next" />
      </div>
    </div>
  );
};
