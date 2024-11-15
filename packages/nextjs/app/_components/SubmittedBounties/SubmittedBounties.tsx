import SubmittedBountiesList from "./SubmittedBountiesList";

const SubmittedBounties = ({ bounties }: { bounties: number[] }) => {
  return (
    <>
      <div className="h-[200px] bg-[#DBFFDA] pt-[75px] pl-6">
        <h1 className="">Submitted</h1>
      </div>
      <div className="z-2 flex items-center flex-col flex-grow ">
        <SubmittedBountiesList ids={bounties} />
      </div>
    </>
  );
};

export default SubmittedBounties;
