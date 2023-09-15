import prisma from "@/app/libs/prismadb";
import getCurrentUser from './getCurrentUser';

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return [];

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || null)]
        }
      }
    })

    const safeFavorites = favorites.map((favorite: any) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }))

    return safeFavorites;
  } catch (error: any) {
    return null;
  }
}