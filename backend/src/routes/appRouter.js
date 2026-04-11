
import { Router } from 'express';
const appRouter = Router();
import  { postsGet } from "../controllers/appController.js";
//import {isAuth } from '../middleware/authMiddleware';

//universal
appRouter.use((req, res, next) => {
    if(req.user) res.locals.user = req.user;
    next();
})

//posts
appRouter.get("/api/posts", postsGet);

export default appRouter;