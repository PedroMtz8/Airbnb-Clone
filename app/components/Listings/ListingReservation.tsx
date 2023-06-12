import { Range } from "react-date-range"
import Calendar from '../Input/Calendar';

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

export default function ListingReservation({ 
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates }: ListingReservationProps){
  return(
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
    </div>
  )
} 