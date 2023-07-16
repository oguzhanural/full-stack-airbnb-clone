'use client';
import { useCallback, useMemo, useState } from "react";
import { categories } from "@/app/components/navbar/Categories";
import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { eachDayOfInterval, setDate } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

interface ListingClientProps { 
  currentUser?: SafeUser | null;
  reservations?: Reservation[];
  listing: SafeListing & {
    user: SafeUser
  };

}

const ListingClient:React.FC<ListingClientProps> = ({
    listing,
    reservations = [],
    currentUser
}) => {

    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];
        reservations.forEach((reservation) => {
             const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
             });
             
             dates = [...dates, ...range];
        });
        return dates;

    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState(initialDateRange);

    //create our reservations
    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        setIsLoading(true); // process has begun

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
        .then(() => {
            toast.success('Listing reserved!');
            setDateRange(initialDateRange);
            // redirect to /trips
            router.refresh();
        })
        .catch(()=>{
            toast.error('Something went wrong!');
        })

    }, []);

    const category = useMemo(() => {
        return categories.find((item)=>
        item.label === listing.category) // The find() method returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.
    }, [listing.category]);


  return (
    <Container>
        <div className="max-w-screen-lg mx-auto">
         <div className="flex flex-col gap-6">
            <ListingHead
                title={listing.title}
                imageSrc={listing.imageSrc}
                locationValue = {listing.locationValue}
                id={listing.id}
                currentUser = {currentUser}
            />
            <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
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
        </div>
    </Container>
   

  )
}

export default ListingClient