import EmptyState from '../components/EmptyState';
import getCurrentUser from '../actions/getCurrentUser';
import getFavoriteListings from '../actions/getFavorites';
import FavoritesClient from './FavoritesClient';

export default async function ListingPage(){

  const currentUser = await getCurrentUser();

  if(!currentUser) return (
    <>
      <EmptyState 
        title='Unauthorized'
        subtitle="Please login"
      />
    </>
  )
  const listings = await getFavoriteListings();

  if (listings?.length === 0) return (
    <>
      <EmptyState 
        title='No favorites found'
        subtitle="Looks like you have no favorite listings"
      />
    </>
  )

  return (
    <>
      <FavoritesClient 
        listings={listings}
        currentUser={currentUser}
      />
    </>
  ); 
}