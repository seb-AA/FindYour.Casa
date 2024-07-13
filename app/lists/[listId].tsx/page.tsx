// pages/lists/[listId].tsx
"useclient"

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";
import useRentModal from "@/app/hooks/useRentModal";

const ListPage = () => {
  const router = useRouter();
  const { listId } = router.query;
  const [list, setList] = useState(null);
  const [items, setItems] = useState([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const rentModal = useRentModal();

  useEffect(() => {
    if (listId) {
      const fetchList = async () => {
        const response = await axios.get(`/api/lists/${listId}`);
        setList(response.data);
        setItems(response.data.items);
      };

      fetchList();
    }
  }, [listId]);

  const onCancel = async (id: string) => {
    setDeletingId(id);

    try {
      await axios.delete(`/api/items/${id}`);
      toast.success("Item deleted successfully");
      setItems(items.filter(item => item.id !== id));
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setDeletingId(null);
    }
  };

  const onEdit = (item) => {
    rentModal.onOpen('edit', item); // Open the modal in edit mode with item data
  };

  return (
    <Container>
      <Heading title={list?.title || 'List'} subtitle="Manage your items" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {items.map((item) => (
          <ListingCard
            key={item.id}
            data={item}
            actionId={item.id.toString()}
            onAction={onCancel}
            onEdit={onEdit}
            disabled={deletingId === item.id.toString()}
            actionLabel="Delete item"
          />
        ))}
      </div>
    </Container>
  );
};

export default ListPage;
