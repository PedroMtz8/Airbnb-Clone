import prisma from "@/app/libs/prismadb";

export interface IListingParams {
  userId?: string;
  category?: string;
}

export default async function getListings(params: IListingParams) {
  try {
    const { userId, category } = params;

    let query = {};

    if (userId) {
      query = {
        userId: userId
      };
    }
    if (category) {
      query = {
        category
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc"
      }
    })

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    return null
    // throw new Error(error);
  }
}