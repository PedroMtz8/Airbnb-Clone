import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import ListingClient from './listingClient';
import getReservations from '@/app/actions/getReservations';
import type { Metadata } from 'next';
import { Listing } from '@prisma/client';
import { SafeListing } from '@/app/types';

interface IParams {
  listingId?: string
}
type Params = {
  params: {
    listingId: string;
  }
}

export async function generateMetadata({params: { listingId } }: Params){
  const listing = await getListingById({ listingId });
  return {
    title: listing?.title + " | Airbnb",
    description: listing?.description,
    openGraph: {
      images: [listing?.imageSrc],
    },
    // icons: {
    //   icon: listing?.imageSrc
    // },
  }

}

async function ListingPage({ params }: { params: IParams }) {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);
  // console.log(listing.)

  if (!listing) return (
    <ClientOnly>
      <EmptyState />
    </ClientOnly>
  )

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  )
}

export default ListingPage;