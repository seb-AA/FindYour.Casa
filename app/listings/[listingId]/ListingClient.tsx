"use client";

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import Map from "@/app/components/Map";
import { categories } from "@/app/components/navbar/Categories";
import { Listing, Reservation, User } from "@prisma/client";
import { useMemo } from "react";
import Button from "@/app/components/Button";

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
    <Container>
      <div className="flex flex-col gap-6 w-full mt-30">
        <ListingHead
          title={listing.title}
          imageSrc={listing.imageSrc}
          latitude={listing.latitude ?? 0}
          longitude={listing.longitude ?? 0}
          id={listing.id}
          currentUser={currentUser}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="col-span-2 flex flex-col gap-6">
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
            <Button
              label="View Listing"
              onClick={() => window.open(`/listings/${listing.id}`, '_blank')}
              fullWidth
            />
          </div>
          <div className="col-span-1 flex flex-col gap-6">
            {listing.notes && (
              <div>
                <h3 className="text-lg font-semibold">Notes</h3>
                <p>{listing.notes}</p>
              </div>
            )}
            {listing.extractedInfo && (
              <div>
                <h3 className="text-lg font-semibold">Extracted Information</h3>
                <p>{listing.extractedInfo}</p>
              </div>
            )}
          </div>
          <div className="col-span-3">
            {locationCoordinates && <Map center={locationCoordinates} />}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
