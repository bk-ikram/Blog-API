
import { Router } from 'express';
const appRouter = Router();
import  { postsGet
    ,signInPost
 } from "../controllers/appController.js";
import passport from 'passport';
//import {isAuth } from '../middleware/authMiddleware';
import { authenticateLocal } from '../../middleware/authMiddleware.js'

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

export default appRouter;