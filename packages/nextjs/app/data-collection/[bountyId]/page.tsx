"use client";

import { useState } from "react";
import { useEffect } from "react";
import { DataCollectionHeader } from "../_components/DataCollectionHeader";
import DataCollectionTaskImage from "../_components/DataCollectionTaskImage";
import DataCollectionTaskTextInput from "../_components/DataCollectionTaskTextInput";
import type { NextPage } from "next";
import useBounties from "~~/hooks/useBounties";

interface DataCollectionPageProps {
  params: { bountyId: string };
}

type TaskType = "image" | "textbox";

type ImageTask = {
  type: TaskType;
  src: string;
};

export type TextboxTask = {
  type: TaskType;
  textTop: string;
  textLeft: string[];
  textToInput: string;
};

type Task = ImageTask | TextboxTask;

const tasks: Task[] = [
  {
    type: "image",
    src: "/think1.png",
  },
  {
    type: "image",
    src: "/think2.png",
  },
  {
    type: "image",
    src: "/think3.png",
  },
  {
    type: "image",
    src: "/think4.png",
  },
  {
    type: "textbox",
    textTop: "Etirium",
    textLeft: ["contract"],
    // textToInput: "i can read an Etirium contract",
    textToInput: "",
  },
  {
    type: "textbox",
    textTop: "Etirium",
    textLeft: ["thriving", "ecosystem"],
    textToInput: "Etririum has a thriving ecosystem",
  },
  {
    type: "textbox",
    textTop: "Etirium",
    textLeft: ["tiker", "understand"],
    textToInput: "i understand that the ticker is Etirium",
  },
];

const DataCollectionPage: NextPage<DataCollectionPageProps> = ({ params }) => {
  const { bounties } = useBounties();
  const [step, setStep] = useState<number>(1);

  const bountyId = params.bountyId;

  const bountyName = bounties[parseInt(bountyId)]?.title;

  const handleNextStep = () => {
    setStep(prevStep => Math.min(prevStep + 1, tasks.length));
  };

  const handleBack = () => {
    setStep(prevStep => Math.max(prevStep - 1, 1));
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    console.log(event.key); // Debugging line to confirm key detection
    console.log(step);
    if (event.key === "ArrowRight") {
      handleNextStep();
    } else if (event.key === "ArrowLeft") {
      handleBack();
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Empty dependency array to only add the listener once

  if (!bountyId) {
    return (
      <div className="container">
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="mt-4">Bounty ID is required to access this page.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <DataCollectionHeader
        next={handleNextStep}
        back={handleBack}
        bountyName={bountyName}
        totalSteps={tasks.length}
        currentStep={step}
      />
      {tasks[step - 1].type === "image" && (
        <DataCollectionTaskImage imageSrc={tasks[step - 1].src as ImageTask["src"]} />
      )}
      {tasks[step - 1].type === "textbox" && (
        <DataCollectionTaskTextInput step={step} task={tasks[step - 1] as TextboxTask} />
      )}
    </div>
  );
};

export default DataCollectionPage;
