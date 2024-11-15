import { useEffect, useState } from "react";
import BountyInfo from "./BountyInfo";
import styles from "./BountyInfoContainer.module.scss";
import Consent from "./Consent";
import { IoClose } from "react-icons/io5";
// Added Open icon
import { Bounty } from "~~/types/bounty";

export type BountyInfoContainerProps = Bounty & {
  id: number;
  progress: number;
  close: () => void;
};

const BountyInfoContainer = ({
  title,
  description,
  creator,
  reward,
  duration,
  progress,
  maxProgress,
  submissions,
  id,
  close,
}: BountyInfoContainerProps) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(creator).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const toConsent = () => {
    setComponentToRender(<Consent bountyId={id.toString()} />);
  };
  const [componentToRender, setComponentToRender] = useState<React.ReactNode>(
    <BountyInfo
      onStart={toConsent}
      title={title}
      description={description}
      creator={creator}
      reward={reward}
      duration={duration}
      progress={progress}
      maxProgress={maxProgress}
      submissions={submissions}
      id={id}
      close={close}
      copyToClipboard={copyToClipboard}
      copySuccess={copySuccess}
    />,
  );

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [close]);

  return (
    <div className={`${styles.BountyInfo} flex flex-col p-8 w-full max-w-lg rounded-lg shadow-lg relative`}>
      <button onClick={close} className={styles.closeButton}>
        <IoClose size={24} />
      </button>
      {componentToRender}
    </div>
  );
};

export default BountyInfoContainer;
