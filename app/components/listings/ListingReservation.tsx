'use client';
import { Range } from "react-date-range";


interface ListingReservationProps {
    price: number;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    dateRange: Range;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];

}

const ListingReservation:React.FC<ListingReservationProps> = ({
    price,
    totalPrice,
    onChangeDate,
    dateRange,
    onSubmit,
    disabledDates,
    disabled
}) => {

  return (
    <div className="">
        bla bla
    </div>
  )
}

export default ListingReservation