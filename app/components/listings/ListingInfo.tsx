import React from "react";
import { User } from "@prisma/client";

interface ListingInfoProps {
  user: User;
  category: { label: string; icon: React.ReactNode } | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
  agentWebsite?: string;
  notes?: string;
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
  locationValue,
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
        <span className="font-semibold">Location:</span> {locationValue}
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
        <div>
          <span className="font-semibold">Swimming Pool:</span> Yes
        </div>
      )}
      {hasGarage && (
        <div>
          <span className="font-semibold">Garage:</span> Yes
        </div>
      )}
      {numberOfOtherBuildings !== undefined && (
        <div>
          <span className="font-semibold">Number of Other Buildings:</span> {numberOfOtherBuildings}
        </div>
      )}
      {numberOfHabitableBuildings !== undefined && (
        <div>
          <span className="font-semibold">Number of Habitable Buildings:</span> {numberOfHabitableBuildings}
        </div>
      )}
      {landSize !== undefined && (
        <div>
          <span className="font-semibold">Size of Land:</span> {landSize} sq meters
        </div>
      )}
      {arableLandSize !== undefined && (
        <div>
          <span className="font-semibold">Size of Arable Land:</span> {arableLandSize} sq meters
        </div>
      )}
    </div>
  );
};

export default ListingInfo;
