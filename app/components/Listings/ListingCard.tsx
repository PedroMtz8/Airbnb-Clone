'use client';

import useCountries from '@/app/hooks/useCountries';
import { SafeListing, SafeReservation, SaveUser } from '@/app/types';
import { Listing, Reservation } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { format } from "date-fns";
import Image from 'next/image';
import HeartButton from '../HeartButton';
import Button from '../Button';
import Avatar from '../Avatar';

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SaveUser | null
  displayUser?: boolean;
}

function ListingCard({ data, reservation, onAction, disabled, actionLabel, actionId = "", currentUser, displayUser }: ListingCardProps) {
  const router = useRouter();
  const { getByValue } = useCountries();
  // console.log
  const location = getByValue(data.locationValue);

  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (disabled) return

    onAction?.(actionId);

  }, [onAction, actionId, disabled])

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;
    return data.price;

  }, [reservation, data.price])

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  const username = reservation?.user?.name?.split(' ')[0];

  return (
    <div className='col-span-1 group'>
      <div
        className='flex flex-col gap-2 w-full cursor-pointer'
        onClick={() => router.push(`/listings/${data.id}`)}
      >
        <div
          className='
            aspect-square
            w-full
            relative
            overflow-hidden
            rounded-xl
          '
        >
          <Image
            alt="Listing"
            src={data.imageSrc}
            fill
            sizes="md"
            priority
            className='object-cover h-full w-full group-hover:scale-110 transition'
          />
          <div
            className='absolute top-3 right-3'
          >
            <HeartButton
              listingId={data.id}
              currentUser={currentUser}
            />
          </div>
        </div>

        <div className='font-semibold text-lg'>
          {location?.region}, {location?.label}
        </div>

        <div className='font-light text-neutral-500'>
          {reservationDate || data.category}
        </div>

        <div className='flex flex-row items-center gap-1'>
          <div className='font-semibold'>
            $ {price}
          </div>

          {
            !reservation && (
              <div className='font-light '>night</div>
            )
          }

        </div>
      </div>
      <div className='flex flex-col gap-2 mt-2' >
      {
        displayUser && (
          <div className='flex items-center gap-3'>
                <Avatar 
                  src={reservation?.user?.image}
                />
                <div>{username} Reserved this</div>
              </div>
            )
          }
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  )
}

export default ListingCard;