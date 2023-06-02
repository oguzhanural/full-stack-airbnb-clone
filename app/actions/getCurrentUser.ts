import { getServerSession } from "next-auth/next"; 
// This method is especially useful when you are using NextAuth.js with a database. 

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

// to get our sessions: 
export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
    try {
        const session = await getSession();
         if (!session?.user?.email) {
            return null; // this session doesn't exist.
         }
         
         const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
         });
         if (!currentUser) {
            return null;
         }

         return currentUser;

    } catch (error: any) {
        return null;
    }
}