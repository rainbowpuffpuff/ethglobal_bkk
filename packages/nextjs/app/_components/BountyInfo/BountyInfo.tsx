import styles from "./BountyInfoContainer.module.scss";
import { IoCopy, IoOpenOutline } from "react-icons/io5";
// Added Open icon
import { Bounty } from "~~/types/bounty";

export type BountyInfoProps = Bounty & {
  id: number;
  progress: number;
  close: () => void;
  copyToClipboard: () => void;
  copySuccess: boolean;
  onStart: () => void;
};

const BountyInfo = ({
  title,
  description,
  creator,
  reward,
  duration,
  progress,
  maxProgress,
  copyToClipboard,
  copySuccess,
  onStart,
}: BountyInfoProps) => {
  return (
    <>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-md text-slate-500 mb-4">{description}</p>

      <div className={`${styles.infoRow}`}>
        <span className={styles.label}>Created by</span>
        <div className={`${styles.value} ${styles.creatorInfo}`}>
          <span className={styles.address}>{creator}</span>
          <button onClick={copyToClipboard} className={styles.copyButton}>
            <IoCopy size={16} />
          </button>
          <a
            href={`https://explorer.sepolia.linea.build/address/${creator}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkButton}
          >
            <IoOpenOutline size={16} />
          </a>
        </div>
        {copySuccess && <span className={styles.copyFeedback}>Copied!</span>}
      </div>

      <div className={`${styles.infoRow}`}>
        <span className={styles.label}>Type</span>
        <span className={styles.value}>Watch words and type sentences</span>
      </div>

      <div className={`${styles.infoRow}`}>
        <span className={styles.label}>Estimated time</span>
        <span className={styles.value}>3 minutes</span>
      </div>

      <div className={`${styles.infoRow}`}>
        <span className={styles.label}>Number of participants</span>
        <span className={styles.value}>
          {progress} of {maxProgress}
        </span>
      </div>

      <div className={`${styles.infoRow}`}>
        <span className={styles.label}>Time left</span>
        <span className={styles.value}>{duration} blocks</span>
      </div>

      <div className={`${styles.infoRow} mb-4`}>
        <span className={styles.label}>Maximum reward</span>
        <span className={styles.value}>{reward} ETH</span>
      </div>

      <div className="flex justify-around mt-6">
        <button className={styles.actionButton} onClick={onStart}>
          Start
        </button>
        <button className={`${styles.actionButton} ${styles.disabledButton}`} disabled>
          Manage data
        </button>
      </div>
    </>
  );
};

export default BountyInfo;
