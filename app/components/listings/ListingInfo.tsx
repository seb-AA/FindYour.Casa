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
  extractedInfo?: string;  // Add the extractedInfo property
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
    <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-6">
      <div className="col-span-2">
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
          <span className="font-semibold">Location:</span> {latitude}, {longitude}
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
            <span className="font-semibold">Agent Website:</span>
            <a
              href={agentWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Visit Website
            </a>
          </div>
        )}
        {extractedInfo && (
          <div>
            <span className="font-semibold">Extracted Info:</span> {extractedInfo}
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
        {numberOfOtherBuildings && (
          <div>
            <span className="font-semibold">Number of Other Buildings:</span> {numberOfOtherBuildings}
          </div>
        )}
        {numberOfHabitableBuildings && (
          <div>
            <span className="font-semibold">Number of Habitable Buildings:</span> {numberOfHabitableBuildings}
          </div>
        )}
        {landSize && (
          <div>
            <span className="font-semibold">Size of Land:</span> {landSize} sq meters
          </div>
        )}
        {arableLandSize && (
          <div>
            <span className="font-semibold">Size of Arable Land:</span> {arableLandSize} sq meters
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
