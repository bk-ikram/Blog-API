const { Router } = require('express');
const appRouter = Router();
const appController = require("../controllers/appController");

const { isAuth } = require('../middleware/authMiddleware');

//universal
appRouter.use((req, res, next) => {
    if(req.user) res.locals.user = req.user;
    next();
})

//login
appRouter.post()