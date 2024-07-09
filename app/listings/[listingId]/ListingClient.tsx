"use client";

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import Map from "@/app/components/Map";
import { categories } from "@/app/components/navbar/Categories";
import { Listing, Reservation, User } from "@prisma/client";
import axios from "axios";
import { useMemo, useState, useCallback } from "react";
import toast from "react-hot-toast";

interface IListingClientProps {
  reservations?: Reservation[];
  listing: Listing & {
    user: User;
  };
  currentUser?: User | null;
}

const ListingClient: React.FC<IListingClientProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  const [isPublic, setIsPublic] = useState(listing.isPublic);
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  const locationCoordinates = useMemo(() => {
    try {
      return JSON.parse(listing.locationValue);
    } catch (error) {
      console.error("Error parsing locationValue:", error);
      return undefined;
    }
  }, [listing.locationValue]);

  const togglePublic = useCallback(async () => {
    try {
      const response = await axios.patch(`/api/listings/${listing.id}`, {
        isPublic: !isPublic,
      });

      setIsPublic(response.data.isPublic);
      toast.success(`Listing is now ${response.data.isPublic ? "public" : "private"}`);
    } catch (error) {
      toast.error("Failed to update listing visibility");
      console.error(error);
    }
  }, [isPublic, listing.id]);

  const handleEdit = () => {
    // Handle edit functionality, possibly by redirecting to an edit page
    console.log("Edit listing");
  };

  return (
    <Container>
      <div className="flex flex-col gap-6 w-full mt-20">
        <ListingHead
          title={listing.title}
          imageSrc={listing.imageSrc}
          locationValue={listing.locationValue}
          id={listing.id}
          currentUser={currentUser}
        />
        <div className="grid grid-cols-1 gap-6 w-full">
          <ListingInfo
            user={listing.user}
            category={category}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.guestCount}
            bathroomCount={listing.bathroomCount}
            locationValue={listing.locationValue}
            agentWebsite={listing.agentWebsite || undefined}
            notes={listing.notes || undefined}
            hasSwimmingPool={listing.hasSwimmingPool !== null ? listing.hasSwimmingPool : undefined}
            hasGarage={listing.hasGarage !== null ? listing.hasGarage : undefined}
            numberOfOtherBuildings={listing.numberOfOtherBuildings !== null ? listing.numberOfOtherBuildings : undefined}
            numberOfHabitableBuildings={listing.numberOfHabitableBuildings !== null ? listing.numberOfHabitableBuildings : undefined}
            landSize={listing.landSize !== null ? listing.landSize : undefined}
            arableLandSize={listing.arableLandSize !== null ? listing.arableLandSize : undefined}
          />
          <Map center={locationCoordinates} />
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={togglePublic}
            className={`px-4 py-2 rounded-full text-white transition ${isPublic ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
          >
            Make {isPublic ? "Private" : "Public"}
          </button>
          {currentUser?.id === listing.userId && (
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
            >
              Edit Listing
            </button>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
