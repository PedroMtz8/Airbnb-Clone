import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import EmptyState from '@/app/components/EmptyState';
import ListingClient from './listingClient';
import getReservations from '@/app/actions/getReservations';
import type { Metadata } from 'next';

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
  if (!listing) return {
    title: 'Not found | Airbnb',
    description: 'Page not found'
  }
  return {
    title: listing?.title + " | Airbnb",
    description: listing?.description,
    openGraph: {
      images: [listing?.imageSrc],
    },
  }

}

async function ListingPage({ params }: { params: IParams }) {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({listingId: params.listingId, userId: currentUser?.id});

  if (!listing) return (
    <>
      <EmptyState title='Listing not found' subtitle='Try going home' />
    </>
  )

  return (
    <>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </>
  )
}

export default ListingPage;