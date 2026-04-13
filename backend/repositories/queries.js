import { prisma } from "../lib/prisma.js" ;

async function getPosts(){
    return prisma.post.findMany({
        include: {
            user: {
                select: {
                    userName: true
                }
            },
            comments: {
                include:{
                    user: {
                        select: {
                            userName: true
                        }
                    }
                }
            }
        }
    });
}

export { getPosts };