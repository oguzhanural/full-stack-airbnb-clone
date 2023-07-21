// this is a server component. we can't use hook inside of here.
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  listingId?: string;
}


// we can still access the parameters in server components. Which in our cases is the URL here.

const ListingPage = async ({ params }: {params:IParams}) => {

  // we can only use actions like this which directly comminicate with the database.
  const listing = await getListingById(params);

  // listingId ye göre rezervasyonları bulur ve döndürür.
  const reservations = await getReservations(params); 

  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ListingClient 
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />

    </ClientOnly>
  )
}

export default ListingPage;