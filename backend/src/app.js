const express = require("express");
const path = require("node:path");
const passport = require("passport");
const { prisma } = require('./lib/prisma');
const appRouter = require("./routes/appRouter");
const moment = require("moment");

require('dotenv').config();


/** -------------   GENERAL SETUP   -------------  **/

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** -------------   Make libraries available in ejs files   -------------  **/
app.locals.moment = moment;


/** ----------   PASSPORT AUTHENTICATION   ----------- **/

require("../auth/jwtStrategy");
require("../auth/localStrategy");

/** -------------------   ROUTERS   -------------------- **/
app.use("/", appRouter);


/** -------------------   SERVER   -------------------- **/
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //TODO
  //res.render('error');
  console.log(err.stack);
  console.log(err.message);
  res.send("Something went wrong.", err.stack, err.message);
});


const PORT = process.env.PORT || 3000;

app.listen(PORT,(error)=>{
    if(error)
        throw error;
    console.log(`App is listening at port ${PORT}`);
});
