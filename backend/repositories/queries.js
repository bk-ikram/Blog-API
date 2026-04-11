import { prisma } from "../lib/prisma.js" ;

async function getPosts(){
    return prisma.post.findMany();
}

export { getPosts };