import { getPosts } from "../../repositories/queries.js";
import passport from 'passport';

async function postsGet( req, res){
    const posts = await getPosts();
    res.json(posts);
};

function signInPost(req, res){
    console.log("reached signInPost controller");
    return res.json(req.user);
}

export {
    postsGet,
    signInPost
}