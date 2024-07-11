import React from "react";
import { User } from "@prisma/client";
import { FaSwimmingPool, FaCar, FaBuilding } from "react-icons/fa";
import { MdOutlineOtherHouses } from "react-icons/md";

interface ListingInfoProps {
  user: User;
  category: { label: string; icon: React.ReactNode } | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  city: string;
  region: string;
  country: string;
  agentWebsite?: string | null;
  notes?: string | null;
  hasSwimmingPool?: boolean;
  hasGarage?: boolean;
  numberOfOtherBuildings?: number;
  numberOfHabitableBuildings?: number;
  landSize?: number;
  arableLandSize?: number;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  city,
  region,
  country,
  agentWebsite,
  notes,
  hasSwimmingPool,
  hasGarage,
  numberOfOtherBuildings,
  numberOfHabitableBuildings,
  landSize,
  arableLandSize,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="col-span-1 md:col-span-2 flex items-center gap-2">
        <div>{category?.icon}</div>
        <div className="text-lg font-semibold">{category?.label}</div>
      </div>
      <div className="col-span-1 md:col-span-2">{description}</div>
      <hr className="col-span-1 md:col-span-2" />
      <div className="col-span-1">
        <span className="font-semibold">Hosted by:</span> {user.name}
      </div>
      <div className="col-span-1">
        <span className="font-semibold">Location:</span> {city}, {region}, {country}
      </div>
      <div className="col-span-1">
        <span className="font-semibold">Rooms:</span> {roomCount}
      </div>
      <div className="col-span-1">
        <span className="font-semibold">Bathrooms:</span> {bathroomCount}
      </div>
      <div className="col-span-1">
        <span className="font-semibold">Guests:</span> {guestCount}
      </div>
      {agentWebsite && (
        <div className="col-span-1">
          <span className="font-semibold">Agent Website:</span>{" "}
          <a href={agentWebsite} target="_blank" rel="noopener noreferrer">
            {agentWebsite}
          </a>
        </div>
      )}
      {notes && (
        <div className="col-span-1">
          <span className="font-semibold">Notes:</span> {notes}
        </div>
      )}
      {hasSwimmingPool && (
        <div className="col-span-1 flex items-center gap-2">
          <FaSwimmingPool />
          <span className="font-semibold">Swimming Pool:</span> Yes
        </div>
      )}
      {hasGarage && (
        <div className="col-span-1 flex items-center gap-2">
          <FaCar />
          <span className="font-semibold">Garage:</span> Yes
        </div>
      )}
      {numberOfOtherBuildings !== undefined && (
        <div className="col-span-1 flex items-center gap-2">
          <MdOutlineOtherHouses />
          <span className="font-semibold">Number of Other Buildings:</span> {numberOfOtherBuildings}
        </div>
      )}
      {numberOfHabitableBuildings !== undefined && (
        <div className="col-span-1 flex items-center gap-2">
          <FaBuilding />
          <span className="font-semibold">Number of Habitable Buildings:</span> {numberOfHabitableBuildings}
        </div>
      )}
      {landSize && (
        <div className="col-span-1">
          <span className="font-semibold">Size of Land:</span> {landSize} sq meters
        </div>
      )}
      {arableLandSize && (
        <div className="col-span-1">
          <span className="font-semibold">Size of Arable Land:</span> {arableLandSize} sq meters
        </div>
      )}
    </div>
  );
};

export default ListingInfo;
