// @ts-nocheck
import { useState } from "react";
import Backdrop from "../Backdrop";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosAdd } from "react-icons/io";
import useBounties from "~~/hooks/useBounties";
import { useAccount, useBalance, useWriteContract } from "wagmi";

const BountyCreator = () => {
  const [openCreator, setOpenCreator] = useState<boolean>(false);

  const { createBounty, approve } = useBounties();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bounty = {
      name: e.target[0].value,
      description: e.target[1].value,
      mediaURI: e.target[2].value,
      reward: e.target[3].value,
      maxProgress: parseInt(e.target[4].value),
      duration: parseInt(e.target[5].value),
      judgeTime: 14000,
    };
    await approve().then(() => {
      createBounty(bounty);
    });
    alert("Bounty created! Reload the page to see it.");
    setOpenCreator(false);
  };
const account = useAccount();
const balance = useBalance({
  address: account.address,
});
  return (
    <div>
      <button
        onClick={() => setOpenCreator(true)}
        className="h-[42px] rounded-full border pr-8 pl-8 pb-2 pt-2 text-center border border-black dark:border-white"
      >
        <div className="flex gap-2 align-center justify-center text-center">
          {/* @ts-ignore */}
          <IoIosAdd className="mt-auto mb-auto" /> <span>New bounty</span>
        </div>
      </button>
      <AnimatePresence>
        {openCreator && (
          <motion.div>
            <Backdrop onClick={() => setOpenCreator(false)}>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col bg-bgcolor gap-2 p-10 w-[400px] minh-[400px] justify-between"
              >
                <h1>New Bounty</h1>
                <p>Add a bounty and specify a prize pool to award participants </p>
                <input className="p-2 rounded" placeholder="Name" required></input>
                <textarea
                  className="p-2 h-[8rem] rounded"
                  placeholder="Description (max. 256 characters)"
                  required
                ></textarea>
                <input className="p-2 rounded" placeholder="Resource URL" required></input>
                <div className="flex flex-col items-center">
    <label htmlFor="reward" className="text-center">
      Current balance:
    </label>
    <span className="text-center">
      {balance.data?.formatted} {balance.data?.symbol}
    </span>
  </div>

                <input
                  className="p-2 rounded"
                  placeholder="Reward (The ticker is $ETH)"
                  required
                  type="number"
                  min="0"
                  step="any"
                  name="reward"
                ></input>
                <input className="p-2 rounded" placeholder="Participants" required type="number"></input>
                <input className="p-2 rounded" placeholder="Bounty Duration (in blocks)" required type="number"></input>
                <button
                  type="submit"
                  className="h-[42px] rounded-full bg-bgcolor invert pr-8 pl-8 pb-2 pt-2 text-center"
                >
                  <div className="flex gap-2 align-center justify-center text-center">
                    {/* @ts-ignore */}
                    <IoIosAdd className="mt-auto mb-auto" /> <span>Create</span>
                  </div>
                </button>
              </form>
            </Backdrop>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BountyCreator;
