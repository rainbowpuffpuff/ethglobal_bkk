import Image from "next/image";

const DataCollectionTaskImage = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Image src={imageSrc} alt="Full Screen" width={700} height={700} quality={100} />
    </div>
  );
};

export default DataCollectionTaskImage;
