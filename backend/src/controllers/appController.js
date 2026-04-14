import { getPosts } from "../../repositories/queries.js";
import jwt from "jsonwebtoken";
import passport from 'passport';

async function postsGet( req, res){
    const posts = await getPosts();
    res.json(posts);
};

function signInPost(req, res){
    const user = req.user;

    const payload = {
        sub: user.id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    return res.json({
        token,
        user: {
            id: user.id,
            username: user.userName
        }
    });
}

export {
    postsGet,
    signInPost
}