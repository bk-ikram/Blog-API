
import { Router } from 'express';
const appRouter = Router();
import  { postsGet
    ,signInPost
    ,postPost
    ,deletePost
 } from "../controllers/appController.js";
import passport from 'passport';
import { authenticateLocal
        ,authenticateJWT
        ,isUserAuthor
 } from '../../middleware/authMiddleware.js'

//universal
appRouter.use((req, res, next) => {
    if(req.user) res.locals.user = req.user;
    next();
})

//posts
appRouter.get("/api/posts", postsGet);

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

export default appRouter;