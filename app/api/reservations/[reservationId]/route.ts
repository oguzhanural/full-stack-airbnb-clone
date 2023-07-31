import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams { 
    reservationId?: string;

};

export async function DELETE(request:Request, { params }: {params: IParams} ) {

    //fetch current user
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }
    

    // extract reservation Id
    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== 'string') {
        throw new Error('Invalid Id...');
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: currentUser.id},  // rezevasyonu yapan kullanıcı iptal edebilir
                { listing: { userId: currentUser.id} } // veya listingin sahibi ise kendi mülkünde ki rezervasyonu iptal edebilir.
            ]
        }
    });

    return NextResponse.json(reservation);
}
