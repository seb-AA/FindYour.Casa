import React from "react";
import { User } from "@prisma/client";
import { FaSwimmingPool, FaCar, FaBuilding, FaTree } from "react-icons/fa";

interface ListingInfoProps {
  user: User;
  category: { label: string; icon: React.ReactNode } | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  city: string;  // Updated
  region: string;  // Updated
  country: string;  // Updated
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <div className="flex items-center gap-2">
          <div>{category?.icon}</div>
          <div className="text-lg font-semibold">{category?.label}</div>
        </div>
        <div className="text-gray-600">{description}</div>
      </div>
      <hr className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4" />
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
        <div className="col-span-1 sm:col-span-2">
          <span className="font-semibold">Agent Website:</span>{" "}
          <a href={agentWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            {agentWebsite}
          </a>
        </div>
      )}
      {notes && (
        <div className="col-span-1 sm:col-span-2">
          <span className="font-semibold">Notes:</span> {notes}
        </div>
      )}
      {hasSwimmingPool && (
        <div className="col-span-1 flex items-center gap-1">
          <FaSwimmingPool />
          <span className="font-semibold">Swimming Pool:</span> Yes
        </div>
      )}
      {hasGarage && (
        <div className="col-span-1 flex items-center gap-1">
          <FaCar />
          <span className="font-semibold">Garage:</span> Yes
        </div>
      )}
      {numberOfOtherBuildings !== undefined && (
        <div className="col-span-1">
          <span className="font-semibold">Number of Other Buildings:</span> {numberOfOtherBuildings}
        </div>
      )}
      {numberOfHabitableBuildings !== undefined && (
        <div className="col-span-1">
          <span className="font-semibold">Number of Habitable Buildings:</span> {numberOfHabitableBuildings}
        </div>
      )}
      {landSize !== undefined && (
        <div className="col-span-1">
          <span className="font-semibold">Size of Land:</span> {landSize} sq meters
        </div>
      )}
      {arableLandSize !== undefined && (
        <div className="col-span-1">
          <span className="font-semibold">Size of Arable Land:</span> {arableLandSize} sq meters
        </div>
      )}
    </div>
  );
};

export default ListingInfo;
