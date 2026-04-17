import { getPosts
    ,upsertPost
 } from "../../repositories/queries.js";
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
        expiresIn: "24h",
    });

    return res.json({
        token,
        user: {
            id: user.id,
            username: user.userName
        }
    });
}


async function postPost( req, res){
    try{
        console.log("postpost controller reached",req.body);
        const {id,
            title,
            content,
            publish,
        } = req.body;

        const userId = req.user.id;

        const post = await upsertPost(
            Number(id)
            ,title
            ,content
            ,publish === "yes"
            ,Number(userId)
        );
        console.log("After upsert query ",post);
        return res.json('done');
    }
    catch(err){
        const msg = "Failed to create/modify post";
        console.error(msg,err);
        return res.status(500).json({message: msg});
    }
    
};


export {
    postsGet,
    signInPost,
    postPost
}