// pages/lists.tsx
"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import Link from 'next/link';

const ListsPage = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      const response = await axios.get('/api/lists');
      setLists(response.data);
    };

    fetchLists();
  }, []);

  return (
    <Container>
      <Heading title="Lists" subtitle="Manage your lists" />
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
