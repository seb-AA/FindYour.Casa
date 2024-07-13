import React from "react";
import { User } from "@prisma/client";

interface ListingInfoProps {
  user: User;
  category: { label: string; icon: React.ReactNode } | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  latitude: number;
  longitude: number;
  agentWebsite?: string | null;
  notes?: string | null;
  extractedInfo?: string;
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
  latitude,
  longitude,
  agentWebsite,
  notes,
  extractedInfo,  // Use the extractedInfo property
  hasSwimmingPool,
  hasGarage,
  numberOfOtherBuildings,
  numberOfHabitableBuildings,
  landSize,
  arableLandSize,
}) => {
  const location = { city: 'Unknown', region: 'Unknown', country: 'Unknown' }; // Placeholder for location data

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="col-span-3y">
        <div className="flex items-center gap-2">
          <div>{category?.icon}</div>
          <div className="text-lg font-semibold">{category?.label}</div>
        </div>
        <div>{description}</div>
        <hr />
        <div className="flex justify-between">
          <div>
            <span className="font-semibold">Hosted by:</span> {user.name}
          </div>
        {extractedInfo && (
          <div>
            <span className="font-semibold">Extracted Info:</span> {extractedInfo}
          </div>
        )}
      </div>
      <div className="col-span-1">
        {notes && (
          <div>
            <span className="font-semibold">Notes:</span> {notes}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingInfo;
