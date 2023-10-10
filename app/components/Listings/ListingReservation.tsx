import { Range } from "react-date-range"
import Calendar from '../Input/Calendar';
import Button from '../Button';
import useConfirmReservation from '@/app/hooks/useConfirmReservation';
import ConfirmReservationModal from '../modals/ConfirmReservationModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeListing, SaveUser } from '@/app/types';

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
  currentUser: any;
}

export default function ListingReservation({ 
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
  currentUser,
}: ListingReservationProps){

  const confirmReservation = useConfirmReservation();
  const loginModal = useLoginModal();

  const handleModals = () => {
    if (!currentUser) return loginModal.onOpen();
    confirmReservation.onOpen();
  }

  return(
    <>
      <ConfirmReservationModal />
      <div
        className='
          bg-white
          rounded-xl
          border-[1px]
          border-neutral-200
          overflow-hidden
        '
      >
        <div className='flex flex-row items-center gap-1 p-4'>
          <div className='text-2 font-semibold'>
              ${price}
          </div>
          <div className='font-light text-neutral-600'>
            night
          </div>
        </div>
        <hr />
        <Calendar
          value={dateRange}
          disabledDates={disabledDates}
          onChange={(value:any) => onChangeDate(value.selection)}
        />
        <hr />
        <div className='p-4'>
        <Button 
              disabled={disabled}
              label="Reserve"
              onClick={handleModals}
            />
            {/* <Button 
              disabled={disabled}
              label="Reserve"
              onClick={onSubmit}
            /> */}
        </div>
        <div className='
          p-4
          flex
          flex-row
          items-center
          justify-between
          font-semibold
          text-lg
        '>
            <div>
              Total
            </div>
            <div>
              $ {totalPrice}
            </div>
        </div>
      </div>
      </>
  )
} 
