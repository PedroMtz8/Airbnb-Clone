'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SafeListing, SafeReservation, SaveUser } from '@/app/types';
import { categories } from '@/app/components/Navbar/Categories';
import Container from '@/app/components/Container';
import ListingHead from '@/app/components/Listings/ListingHead';
import ListingInfo from '@/app/components/Listings/ListingInfo';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingReservation from '@/app/components/Listings/ListingReservation';
import { Range } from 'react-date-range';
import useListing from '@/app/providers/useListing';

interface ListingClientProps {
  reservations?: SafeReservation[],
  listing: SafeListing & { user: SaveUser },
  currentUser?: SaveUser | null
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}

function ListingClient({ listing, currentUser, reservations = [] }: ListingClientProps) {

  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = []
    
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      })

      dates = [...dates, ...range]
    })

    return dates
  },[reservations])

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();
    setIsLoading(true);

    axios.post("/api/reservations",{
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id
    })
      .then(() => {
        // toast.success("Listing reserved");
        setDateRange(initialDateRange);
        // redirect to /trips
        // router.push("/trips");
      })
      .catch((error) => {
        console.log(error);
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
    totalPrice
  ])

  const { setTotalPrice: setStoreTotalPrice, setListingData, setOnSubmit, setCurrentUser } = useListing();

  useEffect(() => {
    setListingData(listing);
    setStoreTotalPrice(totalPrice);
    setOnSubmit(onCreateReservation)
    setCurrentUser(currentUser);
  },[listing, onCreateReservation, totalPrice, setStoreTotalPrice, setOnSubmit, setListingData, setCurrentUser, currentUser]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate){
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate,
      )
      if(dayCount && listing.price){
        setTotalPrice(dayCount * listing.price)
      }else{
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price])

  

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
          <div
            className='
              order-first
              mb-10
              md:order-last
              md:col-span-3
            '
          >
            <ListingReservation 
              currentUser={currentUser}
              price={listing.price}
              totalPrice={totalPrice}
              onChangeDate={(value: any) => setDateRange(value)}
              dateRange={dateRange}
              onSubmit={onCreateReservation}
              disabled={isLoading}
              disabledDates={disabledDates}
            />

          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient;
