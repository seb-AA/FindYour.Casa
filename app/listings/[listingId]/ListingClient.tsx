"use client";

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import Map from "@/app/components/Map";
import { categories } from "@/app/components/navbar/Categories";
import { Listing, Reservation, User } from "@prisma/client";
import { useMemo, useEffect, useState } from "react";
import useCountries from "@/app/hooks/useCountries";

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
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  const locationCoordinates = useMemo(() => {
    if (listing.latitude !== null && listing.longitude !== null) {
      return [listing.latitude, listing.longitude] as [number, number];
    }
    return undefined;
  }, [listing.latitude, listing.longitude]);

  const { getByLatLng } = useCountries();
  const [location, setLocation] = useState<{ city: string; region: string; country: string } | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      if (listing.latitude && listing.longitude) {
        const loc = await getByLatLng(listing.latitude, listing.longitude);
        setLocation(loc);
      }
    };

    fetchLocation();
  }, [listing.latitude, listing.longitude, getByLatLng]);

  return (
    <Container>
      <div className="flex flex-col gap-6 w-full mt-30">
        <ListingHead
          title={listing.title}
          imageSrc={listing.imageSrc}
          latitude={listing.latitude ?? 0}  // Default to 0 if null
          longitude={listing.longitude ?? 0}  // Default to 0 if null
          id={listing.id}
          currentUser={currentUser}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="md:col-span-2">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              city={location?.city || "Unknown"}
              region={location?.region || "Unknown"}
              country={location?.country || "Unknown"}
              agentWebsite={listing.agentWebsite || undefined}
              notes={listing.notes || undefined}
              extractedInfo={listing.extractedInfo || undefined}  // Display extracted information
              hasSwimmingPool={listing.hasSwimmingPool !== null ? listing.hasSwimmingPool : undefined}
              hasGarage={listing.hasGarage !== null ? listing.hasGarage : undefined}
              numberOfOtherBuildings={listing.numberOfOtherBuildings !== null ? listing.numberOfOtherBuildings : undefined}
              numberOfHabitableBuildings={listing.numberOfHabitableBuildings !== null ? listing.numberOfHabitableBuildings : undefined}
              landSize={listing.landSize !== null ? listing.landSize : undefined}
              arableLandSize={listing.arableLandSize !== null ? listing.arableLandSize : undefined}
            />
          </div>
        </div>
        {locationCoordinates && <Map center={locationCoordinates} />}
      </div>
    </Container>
  );
};

export default ListingClient;
