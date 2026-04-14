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

async function getUserByUsername(username){
    const user = prisma.user.findUnique({
        where: { userName: username },
    })
    return user;
};

export { 
    getPosts,
    getUserByUsername
 };