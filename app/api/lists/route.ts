// pages/api/lists/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, userId } = req.body;
    const list = await prisma.list.create({
      data: {
        title,
        userId,
      },
    });
    res.status(201).json(list);
  } else if (req.method === 'GET') {
    const lists = await prisma.list.findMany();
    res.status(200).json(lists);
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
