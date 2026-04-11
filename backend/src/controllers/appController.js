import { getPosts } from "../../repositories/queries.js";

async function postsGet( req, res){
    const posts = await getPosts();
    res.json(posts);
};

export {
    postsGet
}