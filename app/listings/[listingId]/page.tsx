// this is a server component. we can't use hook inside of here.
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

interface IParams {
  listingId?: string;
}

// we can still access the parameters in server components. Which in our cases is the URL here.
const ListingPage = async ({ params }: {params:IParams}) => {

  // we can only use actions like this which directly comminicate with the database.
  const listing = await getListingById(params);
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }

  return (
    <div>
        {listing.title}
    </div>
  )
}

export default ListingPage;