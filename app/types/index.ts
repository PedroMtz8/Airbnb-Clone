import { Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<
  Listing,
  'createdAt'
> & {
  createdAt: string;
}

export type SaveUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export interface UserBasicInfo {
  image: string;
  name: string;
}

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  user: UserBasicInfo;
  endDate: string;
  listing: SafeListing;
}
