import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
    
    const currentUser = await getCurrentUser();

    //actually this shouldn't happen but let's check anyway
    if (!currentUser) {  
        return (
        <ClientOnly>
            <EmptyState 
            title="Unauthorized"
            subtitle="Please log in."
            />
        </ClientOnly>  
        )
    }

    const reservations = await getReservations({userId: currentUser.id});

    //if there is no reservations
    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                 title="No trips found"
                 subtitle="It looks like you don't have any reservations for trips"
                />
            </ClientOnly>
        )
    }

    // finally if we have a user and reservations...

    return (
       <ClientOnly>
            <TripsClient
               reservations = {reservations}
               currentUser = {currentUser}

            />
       </ClientOnly> 
    )

}
export default TripsPage;