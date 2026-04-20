
import { Router } from 'express';
const appRouter = Router();
import  { postsGet
    ,signInPost
    ,postPost
    ,deletePost
    ,postComment
    ,deleteComment
 } from "../controllers/appController.js";
import passport from 'passport';
import { authenticateLocal
        ,authenticateJWT
        ,isUserAuthor,
        optionalAuth
 } from '../../middleware/authMiddleware.js'

//universal
appRouter.use((req, res, next) => {
    if(req.user) res.locals.user = req.user;
    next();
})

//posts
appRouter.get("/api/posts",
                optionalAuth,
                postsGet);

//signin
appRouter.post("/api/signin",
                authenticateLocal,
                signInPost);

//upsert post
appRouter.post("/api/post",
                authenticateJWT,
                isUserAuthor,
                postPost);

//delete post
appRouter.delete("/api/post/:id",
                authenticateJWT,
                isUserAuthor,
                deletePost
);

//create comment
appRouter.post("/api/post/:id/comment",
                postComment
);

//delete comment
appRouter.delete("/api/comment/:id",
                authenticateJWT,
                isUserAuthor,
                deleteComment
);

export default appRouter;