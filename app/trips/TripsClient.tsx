'use client';
import axios from 'axios';
import Heading from '../components/Heading';
import Container from '../components/Container';
import ListingCard from '../components/Listings/ListingCard';
import { useCallback, useState } from 'react';
import { SafeReservation, SaveUser } from '../types'
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser?: SaveUser | null;
}

function TripsClient({reservations, currentUser}: TripsClientProps) {
  const router = useRouter();

  const date = new Date();
  const isoDate = date.toISOString();

  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback((id: string)=> {
    setDeletingId(id)

    axios.delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success("Reservation canceled")
        router.refresh();
      })
      .catch((error: any) => {
        toast.error(error?.response?.data?.error)
      })
      .finally(() => {
        setDeletingId("");
      })
  }, [router])

  return(
    <Container>
      <Heading
        title="My trips"
        subtitle={`Where you've been and where you're going`}
      />
      <div
        className='
          mt-10
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        '
      >
      {
        reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id || isoDate > reservation.endDate }
            actionLabel={/* isoDate > reservation.endDate ? '' :  */'Cancel Reservation'}
            currentUser={currentUser}
          />
        ))
      }
      </div>
    </Container>
  )
}


export default TripsClient;