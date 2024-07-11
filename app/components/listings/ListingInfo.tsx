import React from "react";
import { User } from "@prisma/client";
import { FaSwimmingPool, FaCar, FaHome, FaWarehouse, FaTree, FaRulerCombined } from "react-icons/fa";

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
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div>{category?.icon}</div>
        <div className="text-lg font-semibold">{category?.label}</div>
      </div>
      <div>{description}</div>
      <hr />
      <div>
        <span className="font-semibold">Hosted by:</span> {user.name}
      </div>
      <div>
        <span className="font-semibold">Location:</span> {city}, {region}, {country}
      </div>
      <div>
        <span className="font-semibold">Rooms:</span> {roomCount}
      </div>
      <div>
        <span className="font-semibold">Bathrooms:</span> {bathroomCount}
      </div>
      <div>
        <span className="font-semibold">Guests:</span> {guestCount}
      </div>
      {agentWebsite && (
        <div>
          <span className="font-semibold">Agent Website:</span>{" "}
          <a href={agentWebsite} target="_blank" rel="noopener noreferrer">
            {agentWebsite}
          </a>
        </div>
      )}
      {notes && (
        <div>
          <span className="font-semibold">Notes:</span> {notes}
        </div>
      )}
      {hasSwimmingPool && (
        <div className="flex items-center gap-2">
          <FaSwimmingPool />
          <span className="font-semibold">Swimming Pool:</span> Yes
        </div>
      )}
      {hasGarage && (
        <div className="flex items-center gap-2">
          <FaCar />
          <span className="font-semibold">Garage:</span> Yes
        </div>
      )}
      {numberOfOtherBuildings && (
        <div className="flex items-center gap-2">
          <FaWarehouse />
          <span className="font-semibold">Number of Other Buildings:</span> {numberOfOtherBuildings}
        </div>
      )}
      {numberOfHabitableBuildings && (
        <div className="flex items-center gap-2">
          <FaHome />
          <span className="font-semibold">Number of Habitable Buildings:</span> {numberOfHabitableBuildings}
        </div>
      )}
      {landSize && (
        <div className="flex items-center gap-2">
          <FaTree />
          <span className="font-semibold">Size of Land:</span> {landSize} sq meters
        </div>
      )}
      {arableLandSize && (
        <div className="flex items-center gap-2">
          <FaRulerCombined />
          <span className="font-semibold">Size of Arable Land:</span> {arableLandSize} sq meters
        </div>
      )}
    </div>
  );
};

export default ListingInfo;
