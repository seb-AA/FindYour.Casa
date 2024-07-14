"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";
import { User } from "@prisma/client";

interface Item {
  id: number;
  name: string;
  description: string;
  notes?: string;
  extractedInfo?: string;
  image?: string;
  link?: string;
}

interface ListPageProps {
  params: {
    listId: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

const ListPage: React.FC<ListPageProps> = ({ params }) => {
  const { listId } = params;
  const [items, setItems] = useState<Item[]>([]);
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
        setItems(items.filter((item) => item.id !== id));
      } catch {
        toast.error("Something went wrong.");
      } finally {
        setDeletingId(null);
      }
    },
    [items]
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
            currentUser={null} // Assuming there's no user context for simplicity
          />
        ))}
      </div>
    </Container>
  );
};

export default ListPage;
