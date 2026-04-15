import passport from "passport";

export function authenticateLocal(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {

    if (err) return next(err);

    if (!user) {
      return res.status(401).json({
        message: info?.message || "Incorrect username or password"
      });
    }

    req.user = user;
    next();

  })(req, res, next);
}