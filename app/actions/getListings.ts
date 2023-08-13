import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
    userId?:string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getListings(params: IListingsParams) {
    try {
        const { 
            userId,
            guestCount,
            roomCount,
            bathroomCount,
            startDate,
            endDate,
            locationValue,
            category
         } = params;

        let query: any = {};

        if (userId) {
            query.userId= userId;
        }
        if (category) {
            query.category= category;
        }
        if (roomCount) {
            query.roomCount = {
                gte: +roomCount // greater than or equal (gte)
            }
        }
        if (guestCount) {
            query.guestCount = {
                gte: +guestCount // greater than or equal (gte)
            }
        }
        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount // greater than or equal (gte)
            }
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate},
                                startDate: {lte: startDate}
                            },
                            {
                                startDate: { lte: endDate},
                                endDate: { gte: endDate} 
                            }
                        ]
                    }
                }
            }
        }
        // fetch listings
        const listings = await prisma.listing.findMany({
            where: query, // burada sorgunun filtrelenme durumuna göre gerekli değişiklikleri query de yapıldıktan sonra "buradan" diye belirtiyoruz.
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));
        return safeListings;
        // return listings;
    } catch (error: any) {
        throw new Error(error);
    }
}