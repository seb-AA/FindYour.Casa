// app/types/index.ts

export type User = {
  id: number;
  name: string;
  email: string;
  emailVerified?: Date | null; // Adjusted to match Prisma's type
  image?: string;
  hashedPassword?: string;
  createdAt: Date;
  updatedAt: Date;
  favoriteIds: number[];
}

export interface CommonListing {
  id: number;
  name: string;
  userId: number;
  description: string;
  notes?: string;
  extractedInfo?: string;
  image?: string;
  link?: string;
  price?: number;
}

export interface CommonList {
  id: number;
  title: string;
  userId: number;
  items: CommonListing[];
}
