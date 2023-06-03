import prisma from "@/app/libs/prismadb";
import { Listing } from '@prisma/client';


export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })

    const parsed = JSON.parse(JSON.stringify(listings)) as Listing[]
    return parsed;
  } catch (error: any) {
    throw new Error(error);
  }
}