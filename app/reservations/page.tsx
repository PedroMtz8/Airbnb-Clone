import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';
import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import ReservationClient from './ReservationsClient';
import { SaveUser } from '../types';


export default async function ReservationPage(){
  const currentUser = await getCurrentUser();

  if(!currentUser) return (
    <ClientOnly>
      <EmptyState 
        title="Unauthorized"
        subtitle='Plese login'
      />
    </ClientOnly>
  )

  const reservations = await getReservations({
    authorId: currentUser.id
  });

  if(reservations?.length === 0) return (
    <ClientOnly>
      <EmptyState 
        title="No reservations found"
        subtitle='Looks like you have no reservations on your properties'
      />
    </ClientOnly>
  )


  console.log(reservations);
  return(
    <ClientOnly>
      {/* <div>something</div> */}
      <ReservationClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}