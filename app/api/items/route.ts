// pages/api/items/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, description, notes, extractedInfo, link } = req.body;
    const item = await prisma.item.create({
      data: {
        name,
        description,
        notes,
        extractedInfo,
        link,
      },
    });
    res.status(201).json(item);
  } else if (req.method === 'GET') {
    const items = await prisma.item.findMany();
    res.status(200).json(items);
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
