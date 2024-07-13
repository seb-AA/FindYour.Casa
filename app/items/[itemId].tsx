// pages/items/[itemId].tsx
"use client"

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import Map from "@/app/components/Map";
import { categories } from "@/app/components/navbar/Categories";
import { User } from "@prisma/client";

const ItemPage = () => {
  const router = useRouter();
  const { itemId } = router.query;
  const [item, setItem] = useState(null);

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
            imageSrc=""  // Assuming there's an image source
            id={item.id}
            currentUser={null}  // Assuming there's no user context for simplicity
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            <div className="col-span-3 lg:col-span-3 mt-6 flex flex-col gap-6">
              <ListingInfo
                user={{ name: "Unknown" } as User}  // Placeholder user
                category={categories.find(cat => cat.label === "Default")}
                description={item.description || "No description available"}
                roomCount={0}
                guestCount={0}
                bathroomCount={0}
                latitude={0}
                longitude={0}
                agentWebsite={item.link || ""}
                hasSwimmingPool={false}
                hasGarage={false}
                numberOfOtherBuildings={0}
                numberOfHabitableBuildings={0}
                landSize={0}
                arableLandSize={0}
              />
            </div>
            <div className="col-span-3 lg:col-span-3 mt-6 flex flex-col gap-6">
              {item.notes && (
                <div className="p-4 bg-gray-100 rounded-md">
                  <h3 className="text-lg font-semibold mb-2">Notes</h3>
                  <p>{item.notes}</p>
                </div>
              )}
              {item.extractedInfo && (
                <div className="p-4 bg-gray-100 rounded-md">
                  <h3 className="text-lg font-semibold mb-2">Extracted Information</h3>
                  <p>{item.extractedInfo}</p>
                </div>
              )}
              <button
                onClick={() => window.open(item.link || '#', '_blank')}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mb-2"
              >
                View Item
              </button>
              {/* Assuming a map is not necessary for items */}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ItemPage;
