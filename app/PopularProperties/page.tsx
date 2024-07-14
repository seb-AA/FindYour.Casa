// app/PopularProperties/page.tsx
"use client";

import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";
import { Listing, User } from "@prisma/client";
import useRentModal from "@/app/hooks/useRentModal";

interface PopularPropertiesProps {
  params: {
    listId: string;
  };
  currentUser?: User | null;
}

const PopularProperties = ({ params, currentUser }: PopularPropertiesProps) => {
  const { listId } = params;
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const rentModal = useRentModal();

  useEffect(() => {
    axios.get(`/api/lists/${listId}`).then((response) => {
      setListings(response.data.items);
    });
  }, [listId]);

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
      rentModal.onOpen("edit", listing);
    },
    [rentModal]
  );

  return (
    <Container>
      <Heading title="Popular Properties" subtitle="List of popular properties" />
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
    </Container>
  );
};

export default PopularProperties;
