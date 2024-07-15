// app/types.ts

export interface User {
  id: number;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  hashedPassword?: string | null;
  createdAt: Date;
  updatedAt: Date;
  favoriteIds: number[];
  // Add other properties as needed
}

export interface ListingCardData {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

export interface Listing {
  id: number;
  userId: number;
  title: string;
  description: string;
  imageSrc: string;
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  latitude?: number | null;
  longitude?: number | null;
  price: number;
  createdAt: Date;
  agentWebsite?: string | null;
  notes?: string | null;
  hasSwimmingPool?: boolean | null;
  hasGarage?: boolean | null;
  numberOfOtherBuildings?: number | null;
  numberOfHabitableBuildings?: number | null;
  landSize?: number | null;
  arableLandSize?: number | null;
  arableLandSizeUnit?: string | null;
  garageSpaces?: number | null;
  hasOtherBuildings?: boolean | null;
  hasArableLand?: boolean | null;
  isPublic: boolean;
  extractedInfo?: string | null;
  user: User;
  reservations: Reservation[];
  propertyLists: PropertyList[];
}

export interface Reservation {
  id: number;
  userId: number;
  listingId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  createdAt: Date;
  user: User;
  listing: Listing;
}

export interface PropertyList {
  id: number;
  name: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  listings: Listing[];
}
