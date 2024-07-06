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
