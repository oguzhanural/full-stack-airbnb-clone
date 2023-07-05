import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export async function POST(request: Request, { params }: { params:IParams } ) {

    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error();
    }
    
    const { listingId } = params;
    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds.push(listingId);

    const user = prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds: favoriteIds
        }
    });

    return NextResponse.json(user);

}

export async function DELETE(request:Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    let favoriteIds = [...(currentUser.favoriteIds || []) ];

    favoriteIds = favoriteIds.filter((id) => id !== listingId); // array'in içinde ki her bir id değerini id değişkenine atıp listing id ile karşılaştırıyor ve eşit olmayanları return ediyor.
    // the selected id out of array
    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds: favoriteIds
        }
    });

    return NextResponse.json(user);

}

