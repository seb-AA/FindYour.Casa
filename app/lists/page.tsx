"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import { CommonList } from "@/app/types";

const ListsPage: React.FC = () => {
  const [lists, setLists] = useState<CommonList[]>([]);

  useEffect(() => {
    axios.get("/api/lists")
      .then((response) => {
        setLists(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch lists:", error);
      });
  }, []);

  return (
    <Container>
      <Heading title="Your Lists" subtitle="Manage your lists" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {lists.map((list) => (
          <div key={list.id} className="p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-semibold mb-2">{list.title}</h3>
            <Link href={`/lists/${list.id}`} passHref>
              <a className="text-blue-500">View List</a>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ListsPage;
