import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}



export default async function getReservations(params: IParams) {

  const { listingId, userId, authorId } = params;
  try {
    const query: any = {};

    if (listingId) {
      query.listingId = listingId
    }

    if (userId) {
      query.userId = userId
    }

    if (authorId) {
      query.listing = { userId: authorId }
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
        user: {
          select: {
            image: true,
            name: true,
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    const safeReservations = reservations.map(
      (reservation: any) => ({
        ...reservation,
        createdAt: reservation.createdAt.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
        user: {
          image: reservation.user.image as string,
          name: reservation.user.name as string,
        },
        listing: {
          ...reservation.listing,
          createdAt: reservation.listing.createdAt.toISOString(),
        },
      })
    );

    return safeReservations;

  } catch (error: any) {
    throw new Error(error);
    // return null;
  }
}