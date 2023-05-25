import { PrismaClient } from "@prisma/client";

declare global {
    //This declaration allows us to access the prisma variable from any file in our project.
    var prisma: PrismaClient | undefined 
    
}

const client = globalThis.prisma || new PrismaClient();
/*
This line initializes the client variable with the value of globalThis.prisma 
if it exists, or creates a new instance of PrismaClient if globalThis.prisma is undefined. 
The client variable is the instance of PrismaClient that we'll use to interact 
with the database. 
*/

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = client;
}

export default client;