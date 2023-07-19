import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';
import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import PropertiesClient from './PropertiesClient';
import getListings from '../actions/getListings';

export default async function PropertiesPage(){
  const currentUser = await getCurrentUser();

  if(!currentUser) return (
     <ClientOnly>
      <EmptyState 
        title='Unauthorized'
        subtitle='Please login'
      />
     </ClientOnly>
  )

  const listings = await getListings({userId: currentUser.id});
  // console.log(reservations)

  if (listings.length === 0) return (
    <ClientOnly>
      <EmptyState 
        title='No properties found'
        subtitle={`Looks like you have no properties`}
      />
     </ClientOnly>
  )

  return (
    <ClientOnly>
      {/* <div>
        hola
      </div> */}
      <PropertiesClient 
          currentUser={currentUser}
          listings={listings}
      />
     </ClientOnly>
  )

}