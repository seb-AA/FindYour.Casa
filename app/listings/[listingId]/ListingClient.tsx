"use client";

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import Map from "@/app/components/Map";
import Navbar from "@/app/components/navbar/Navbar";
import { categories } from "@/app/components/navbar/Categories";
import { Listing, Reservation, User } from "@prisma/client";
import { useMemo } from "react";

interface IListingClientProps {
  reservations?: Reservation[];
  listing: Listing & {
    user: User;
    extractedInfo?: string | null;
  };
  currentUser?: User | null;
}

const ListingClient: React.FC<IListingClientProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  const locationCoordinates = useMemo(() => {
    if (listing.latitude !== null && listing.longitude !== null) {
      return [listing.latitude, listing.longitude] as [number, number];
    }
    return undefined;
  }, [listing.latitude, listing.longitude]);

  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Container>
          <div className="flex flex-col gap-8 w-full mt-12">
            <ListingHead
              title={listing.title}
              imageSrc={listing.imageSrc}
              latitude={listing.latitude ?? 0}
              longitude={listing.longitude ?? 0}
              id={listing.id}
              currentUser={currentUser}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              <div className="col-span-3 lg:col-span-3 flex flex-col gap-8">
                <ListingInfo
                  user={listing.user}
                  category={category}
                  description={listing.description}
                  roomCount={listing.roomCount}
                  guestCount={listing.guestCount}
                  bathroomCount={listing.bathroomCount}
                  latitude={listing.latitude ?? 0}
                  longitude={listing.longitude ?? 0}
                  agentWebsite={listing.agentWebsite || undefined}
                  hasSwimmingPool={listing.hasSwimmingPool !== null ? listing.hasSwimmingPool : undefined}
                  hasGarage={listing.hasGarage !== null ? listing.hasGarage : undefined}
                  numberOfOtherBuildings={listing.numberOfOtherBuildings !== null ? listing.numberOfOtherBuildings : undefined}
                  numberOfHabitableBuildings={listing.numberOfHabitableBuildings !== null ? listing.numberOfHabitableBuildings : undefined}
                  landSize={listing.landSize !== null ? listing.landSize : undefined}
                  arableLandSize={listing.arableLandSize !== null ? listing.arableLandSize : undefined}
                />
              </div>
              <div className="col-span-3 lg:col-span-3 mt-6 flex flex-col gap-6">
                {listing.notes && (
                  <div className="p-4 bg-gray-100 rounded-md">
                    <h3 className="text-lg font-semibold mb-2">Notes</h3>
                    <p>{listing.notes}</p>
                  </div>
                )}
                {listing.extractedInfo && (
                  <div className="p-4 bg-gray-100 rounded-md">
                    <h3 className="text-lg font-semibold mb-2">Extracted Information</h3>
                    <p>{listing.extractedInfo}</p>
                  </div>
                )}
                <button
                  onClick={() => window.open(`/listings/${listing.id}`, '_blank')}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                  View Listing
                </button>
                {locationCoordinates && <Map center={locationCoordinates} />}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ListingClient;
