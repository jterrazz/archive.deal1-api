import * as passport from "koa-passport";
import * as compose from "koa-compose";

import jwtStrategy from "./strategies/jwt";
import facebookStrategy from "./strategies/facebook";

// TODO Explain in MD how it's saved in cookies + serialized / desirelized

passport.use("jwt", jwtStrategy);
passport.use(facebookStrategy);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = { id };
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default () => compose([passport.initialize(), passport.session()]);

// TODO Test without session, remove whole scheme if delete
export const authWithJwt = (): any => passport.authenticate("jwt", { session: false });
export const authWithFacebook = (): any => passport.authenticate("facebook", { scope: ["email"] });
export const authWithFacebookCallback = (): any => passport.authenticate("facebook", { failureRedirect: "/login" });
