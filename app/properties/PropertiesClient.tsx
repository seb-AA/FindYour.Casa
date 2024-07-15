"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Listing, User } from "@prisma/client";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import useRentModal from "@/app/hooks/useRentModal"; // Import the hook
import { ListingCardData } from "@/app/types"; // Adjust the path as needed

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
    (listing: ListingCardData) => {
      rentModal.onOpen('edit', listing); // Open the modal in edit mode with listing data
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
            data={{
              id: listing.id,
              title: listing.title,
              description: listing.description,
              image: listing.imageSrc, // Map imageSrc to image
              price: listing.price,
            }}
            actionId={listing.id.toString()}
            onAction={onCancel}
            onEdit={onEdit}
            disabled={deletingId === listing.id.toString()}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
