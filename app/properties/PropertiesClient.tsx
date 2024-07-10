"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

import { Listing, User } from "@prisma/client";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import RentModal from "../components/modals/RentModal";
import useRentModal from "@/app/hooks/useRentModal"; // Import the hook

interface PropertiesClientProps {
  listings: Listing[];
  currentUser?: User | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const rentModal = useRentModal(); // Use the hook

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted successfully");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong.");
        })
        .finally(() => {
          setDeletingId(null);
        });
    },
    [router]
  );

  const onEdit = useCallback(
    (listing: Listing) => {
      rentModal.setListing(listing); // Set the listing being edited
      rentModal.onOpen(); // Open the modal
    },
    [rentModal]
  );

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div
        className="
          mt-25
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
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id.toString()}
            onAction={onCancel}
            onEdit={onEdit}
            disabled={deletingId === listing.id.toString()}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
      <RentModal />
    </Container>
  );
};

export default PropertiesClient;
