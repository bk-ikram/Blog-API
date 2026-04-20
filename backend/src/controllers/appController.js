import { getPosts
    ,upsertPost
    ,deletePostRepo
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
            ,publish !== undefined
            ,Number(userId)
        );
        return res.json('done');
    }
    catch(err){
        const msg = "Failed to create/modify post";
        console.error(msg,err);
        return res.status(500).json({message: msg});
    }
    
};


async function deletePost( req, res){
    try{
        const id = Number(req.params.id);
        const userId = req.user.id;

        const post = await deletePostRepo( id );
        if(!post)
            return res.status(404).json({ message: "Post not found" });
        return res.status(200).json({message: 'done'});
    }
    catch(err){
        const msg = JSON.stringify(err) || "Failed to delete post";
        console.error(msg,err);
        return res.status(500).json({message: msg});
    }
    
};


export {
    postsGet,
    signInPost,
    postPost,
    deletePost
}