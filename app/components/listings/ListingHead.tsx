"use client";

import { User } from "@prisma/client";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface IListingHeadProps {
  title: string;
  imageSrc: string;
  id: number;
  currentUser?: User | null;
}

const ListingHead: React.FC<IListingHeadProps> = ({
  title,
  imageSrc,
  id,
  currentUser,
}) => {
  return (
    <>
      <Heading title={title} />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image alt="Image" src={imageSrc} fill sizes="100%" className="object-cover w-full" />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
