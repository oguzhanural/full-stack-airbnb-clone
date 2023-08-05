import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
    
    const currentUser = await getCurrentUser();

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

    const listings = await getListings({userId: currentUser.id});

    //if there is no reservations
    if (listings .length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                 title="No properties found"
                 subtitle="It looks like you have no properties"
                />
            </ClientOnly>
        )
    }

    return (
       <ClientOnly>
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}

            />
       </ClientOnly> 
    )

}
export default PropertiesPage;