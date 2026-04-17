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

async function getUserById(id){
    const user = await prisma.user.findUnique({
        where: { id: id },
    })
    return user;
};

async function upsertPost(id, title, content, published, userId){
    const post = await prisma.post.upsert({
        where: { id: id},
        update: {
            title: title,
            content: content,
            published: published,
            publishedAt: published ? new Date() : null,
        },
        create: {
            title: title,
            content: content,
            published: published,
            userId: userId,
            publishedAt: published ? new Date() : null,
        }
    })
    return post;
}

async function isAuthor(id){
    const user = await prisma.user.findUnique({
        where: { id: id }
    });

    return user.role === "AUTHOR";
}

export { 
    getPosts,
    getUserByUsername,
    getUserById,
    upsertPost,
    isAuthor
 };