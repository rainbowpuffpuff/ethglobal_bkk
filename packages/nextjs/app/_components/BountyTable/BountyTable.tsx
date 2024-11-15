import { useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import BountyInfoContainer from "../BountyInfo/BountyInfoContainer";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";
import useBounties from "~~/hooks/useBounties";

// Import the arrow icon from react-icons

const BountyTable = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { bounties } = useBounties();

  return (
    <div className=" w-[100%]">
      <div className="overflow-x-auto px-6">
        <table className="table w-full">
          <thead>
            <tr className="">
              <th className="text-left font-thin py-6">#</th>
              <th className="text-left  font-thin">Name</th>
              <th className="text-left  font-thin">Description</th>
              <th className="text-left  font-thin">Reward</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bounties.map((bounty, i) => (
              <tr key={`bounty-${i}`} className="border-b">
                <td className="text-left py-4">{bounty.id}</td>
                <td className="text-left font-bold py-4">{bounty.title}</td>
                <td className="text-left py-4">{bounty.description}</td>
                <td className="text-left py-4">{bounty.reward}</td>
                <td>
                  <button
                    className="bg-black text-white rounded-full p-2 flex items-center justify-center"
                    onClick={() => setSelectedId(i)}
                  >
                    <IoIosArrowForward />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AnimatePresence>
        {selectedId !== null && (
          <motion.div layoutId={selectedId.toString()}>
            <Backdrop onClick={() => setSelectedId(null)}>
              <BountyInfoContainer {...bounties[selectedId]} id={selectedId} close={() => setSelectedId(null)} />
            </Backdrop>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BountyTable;
