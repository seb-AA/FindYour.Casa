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
  favoriteIds: number[]; // assuming favoriteIds is an array of numbers
  // Add other properties as needed
}
