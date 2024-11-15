import styles from "../BountyInfo/BountyInfoContainer.module.scss";
import RequestInfo from "./RequestInfo";
import { IoClose } from "react-icons/io5";

// Added Open icon

const RequestContainer = ({ close }: { close: () => void }) => {
  return (
    <div className={`${styles.BountyInfo} flex flex-col p-8 w-full max-w-lg rounded-lg shadow-lg relative`}>
      <button onClick={close} className={styles.closeButton}>
        <IoClose size={24} />
      </button>
      <RequestInfo />
    </div>
  );
};

export default RequestContainer;
