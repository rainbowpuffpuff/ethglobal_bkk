"use client";

import { useRouter } from "next/navigation";
import styles from "./BountyInfoContainer.module.scss";

// Each bounty has a consent form that is stored on IPFS

const Consent = ({ bountyId }: { bountyId: string }) => {
  const router = useRouter();

  const handleContinue = () => {
    router.push(`/data-collection/${bountyId}`);
  };

  return (
    <>
      <p>Consent</p>
      <p>
        The data is collected for think2earn.
        <br />
        It will not be shared with third parties.
        <br />
        think2earn will use it only for training an emotion detection model.
        <br />
        Access to the model will be granted to users only in terms of inference for emotion detection.
        <br />
        Data will be stored on a TEE hosted by ovhcloud, which is ISO/IEC 27701, 27001, 27017, 27018 and HDS compliant.
        <br />
        The model and its weights will not be shared with third parties.
        <br />
        You can contact data@think2earn.com to request deletion and download of the data that you provided, in line with
        GDPR.
        <br />
        Alternatively, you can use the My Account page to download and delete your data.{" "}
      </p>

      <div className="flex justify-around mt-6">
        <button className={styles.actionButton}>Back</button>
        <button className={styles.actionButton} onClick={handleContinue}>
          Continue
        </button>
      </div>
    </>
  );
};

export default Consent;
