import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';
import getCurrentUser from '../actions/getCurrentUser';
import getFavoriteListings from '../actions/getFavorites';

export default async function ListingPage(){

  const currentUser = await getCurrentUser();

  if(!currentUser) return (
    <ClientOnly>
      <EmptyState 
        title='Unauthorized'
        subtitle="Please login"
      />
    </ClientOnly>
  )
  const listings = await getFavoriteListings();

  if (listings?.length === 0) return (
    <ClientOnly>
      <EmptyState 
        title='No favorites found'
        subtitle="Looks like you have no favorite listings"
      />
    </ClientOnly>
  )

  return (
    <ClientOnly>
      <div>Here will be favorites</div>
      {/* <FavoritesClient /> */}
    </ClientOnly>
  )
}