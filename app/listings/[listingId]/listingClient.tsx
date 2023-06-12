'use client';
import { useCallback, useMemo, useState } from 'react';
import { Reservation } from '@prisma/client';
import { SafeListing, SaveUser } from '@/app/types';
import { categories } from '@/app/components/Navbar/Categories';
import Container from '@/app/components/Container';
import ListingHead from '@/app/components/Listings/ListingHead';
import ListingInfo from '@/app/components/Listings/ListingInfo';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import { eachDayOfInterval } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface ListingClientProps {
  reservation?: Reservation[],
  listing: SafeListing & { user: SaveUser },
  currentUser?: SaveUser | null
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'Selection'
}

function ListingClient({ listing, currentUser, reservation = [] }: ListingClientProps) {

  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = []
    
    reservation.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      })

      dates = [...dates, ...range]
    })

    return dates
  },[reservation])

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();
    setIsLoading(true);

    axios.post("/api/reservation",{
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listing: listing?.id
    })
      .then(() => {
        toast.success("Listing reserved");
        setDateRange(initialDateRange);
        // redirect to /trips
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      })

  }, [
    currentUser, 
    loginModal, 
    dateRange.startDate, 
    dateRange.endDate,
    listing?.id,
    router,
    totalPrice
  ])

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category)
  }, [listing.category])

  return (
    <Container>
      <div className='max-w-screen-lg mx-auto' >
        <div className='flex flex-col gap-6'>
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
        </div>
        <div className='
          grid
          grid-cols-1
          md:grid-cols-7
          md:gap-10
          mt-6

        '>
          <ListingInfo
            user={listing.user}
            category={category}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.guestCount}
            bathroomCount={listing.bathroomCount}
            locationValue={listing.locationValue}
          />
        </div>
      </div>
    </Container>
  )
}

export default ListingClient;