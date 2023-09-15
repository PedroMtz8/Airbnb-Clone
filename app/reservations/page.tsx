import EmptyState from '../components/EmptyState';
import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import ReservationClient from './ReservationsClient';
import { SaveUser } from '../types';


export default async function ReservationPage(){
  const currentUser = await getCurrentUser();

  if(!currentUser) return (
    <>
      <EmptyState 
        title="Unauthorized"
        subtitle='Plese login'
      />
    </>
  )

  const reservations = await getReservations({
    authorId: currentUser.id
  });

  if(!reservations || reservations?.length === 0) return (
    <>
      <EmptyState 
        title="No reservations found"
        subtitle='Looks like you have no reservations on your properties'
      />
    </>
  )


  return(
    <>
      {/* <div>something</div> */}
      <ReservationClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </>
  )
}