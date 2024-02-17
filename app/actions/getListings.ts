import prisma from "@/app/libs/prismadb";

export interface IListingParams {
  userId?: string;
  category?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
}

export default async function getListings(params: IListingParams) {
  try {
    const {
      userId,
      category,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue
    } = params;

    let query: any = {};

    if (userId) query.userId = userId;

    if (category) query.category = category;

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      }
    }
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount
      }
    }
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      }
    }

    if (locationValue) {
      query.locationValue = locationValue
    }

    if (startDate && endDate) {
      query.NOT = {
        reservation: {
          some: {
            AND: [
              {
                endDate: { gte: endDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: startDate },
                endDate: { gte: endDate }
              },
            ]
          }
        }
      }
    }


    const listings = await prisma.listing.findMany({
      where: {
        ...query,
        locationValue: locationValue
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    const safeListings = listings.map((listing: any) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    return null
    // throw new Error(error);
  }
}