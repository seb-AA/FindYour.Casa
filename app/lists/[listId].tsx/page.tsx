"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";
import { User, CommonListing } from "@/app/types"; // Import the custom types

// Remove the ListPageProps interface and use direct props instead
const ListPage = ({ params, currentUser }: { params: { listId: string }, currentUser?: User | null }) => {
  const { listId } = params;
  const [items, setItems] = useState<CommonListing[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (listId) {
      axios.get(`/api/lists/${listId}`).then((response) => {
        setItems(response.data.items);
      });
    }
  }, [listId]);

  const onDelete = useCallback(
    async (id: number) => {
      setDeletingId(id);

      try {
        await axios.delete(`/api/items/${id}`);
        toast.success("Item deleted successfully");
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      } catch {
        toast.error("Something went wrong.");
      } finally {
        setDeletingId(null);
      }
    },
    []
  );

  return (
    <Container>
      <Heading title="List Items" subtitle="Items in this list" />
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
        {items.map((item) => (
          <ListingCard
            key={item.id}
            data={item}
            actionId={item.id.toString()}
            onAction={() => onDelete(item.id)}
            disabled={deletingId === item.id}
            actionLabel="Delete item"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ListPage;
