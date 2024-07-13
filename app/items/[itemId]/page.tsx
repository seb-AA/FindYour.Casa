"use client";

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { User } from "@prisma/client";

interface Item {
  id: number;
  name: string;
  description: string;
  notes?: string | null;
  extractedInfo?: string | null;
  image?: string | null;
  link?: string | null;
}

const ItemPage = () => {
  const router = useRouter();
  const { itemId } = router.query;
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    if (itemId) {
      const fetchItem = async () => {
        const response = await axios.get(`/api/items/${itemId}`);
        setItem(response.data);
      };

      fetchItem();
    }
  }, [itemId]);

  if (!item) return <div>Loading...</div>;

  return (
    <div className="mt-20">
      <Container>
        <div className="flex flex-col gap-8 w-full mt-12">
          <ListingHead
            title={item.name}
            imageSrc={item.image || "/placeholder-image.jpg"}
            id={item.id}
            currentUser={null}  // Assuming there's no user context for simplicity
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            <div className="col-span-3 lg:col-span-3 mt-6 flex flex-col gap-6">
              <ListingInfo
                user={{ name: "Unknown" } as User}  // Placeholder user
                description={item.description || "No description available"}
                notes={item.notes}
                extractedInfo={item.extractedInfo}
              />
              <button
                onClick={() => window.open(item.link || '#', '_blank')}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mb-2"
              >
                View Item
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ItemPage;
