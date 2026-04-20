import { prisma } from "../lib/prisma.js" ;

async function getPosts(isPublic){
    return prisma.post.findMany({
        where: {
            ...( isPublic ? { published : true } : {} )
        },
        include: {
            user: {
                select: {
                    userName: true
                }
            },
            comments: true,
        }
    });
}

async function getUserByUsername(username){
    const user = await prisma.user.findUnique({
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

async function deletePostRepo(id){
    try{
        const post = await prisma.post.delete({
        where: { id: id }
        });

        return post;
    }
    catch(err){
        throw new Error(err);
    }
}

async function createComment(id, guestname, content){
    const comment = await prisma.comment.create({
        data: {
            postId: id,
            content: content,
            guestName: guestname,
        },
        
    });
    return comment;
}

async function deleteCommentRepo(id){
    try{
        const comment = await prisma.comment.delete({
        where: { id: id }
        });

        return comment;
    }
    catch(err){
        throw new Error(err);
    }
}

export { 
    getPosts,
    getUserByUsername,
    getUserById,
    upsertPost,
    isAuthor,
    deletePostRepo,
    createComment,
    deleteCommentRepo
 };