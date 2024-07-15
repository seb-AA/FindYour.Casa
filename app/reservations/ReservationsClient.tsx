"use client";

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { Listing, Reservation, User } from "@prisma/client";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import ListingCard from "../components/listings/ListingCard";
import { ListingCardData } from "@/app/types"; // Import the type

interface ReservationsClientProps {
  reservations: (Reservation & { listing: Listing })[];
  currentUser: User | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Manage your reservations" />
      <div
        className="
          mt-10
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {reservations.map((reservation) => {
          // Create a ListingCardData object from reservation.listing
          const listingCardData: ListingCardData = {
            id: reservation.listing.id,
            title: reservation.listing.title,
            description: reservation.listing.description,
            image: reservation.listing.imageSrc, // Map imageSrc to image
            price: reservation.listing.price,
          };

          return (
            <ListingCard
              key={reservation.id}
              data={listingCardData}
              reservation={reservation}
              actionId={reservation.id.toString()} // Convert id to string
              onAction={onCancel}
              disabled={deletingId === reservation.id.toString()} // Convert id to string
              actionLabel="Cancel guest reservation"
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default ReservationsClient;
