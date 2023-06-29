import prisma from "@/app/libs/prismadb";

export default async function getListing() {
    try {
        // fetch listings
        const listings = await prisma.listing.findMany()


    } catch (error: any) {
        throw new Error(error);
    }
}