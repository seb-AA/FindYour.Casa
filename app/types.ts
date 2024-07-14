export type User = {
  id: number;
  name: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  hashedPassword?: string;
  createdAt: Date;
  updatedAt: Date;
  favoriteIds: number[];  // Ensure this is number[]
  // other fields...
};

export interface CommonListing {
  id: number;
  name: string;
  description: string;
  notes?: string;
  extractedInfo?: string;
  image?: string;
  link?: string;
  price?: number; // Include price if used in ListingCard
  // Add any other properties used in ListingCard
}
