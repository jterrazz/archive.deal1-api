import * as passport from "koa-passport";
import * as compose from "koa-compose";
import { getRepository } from "typeorm";

import jwtStrategy from "./strategies/jwt";
import facebookStrategy from "./strategies/facebook";

import { User } from "@entities";

// TODO Explain in MD how it's saved in cookies + serialized / desirelized

passport.use("jwt", jwtStrategy);
passport.use(facebookStrategy);

passport.serializeUser((loginIds: any, done) => {
  done(null, loginIds);
});
passport.deserializeUser(async (loginIds: any, done) => {
  try {
    let user = null;
    // TODO Maybe pass a copy of the data and not the User object TO AVOID LEAKS !!!
    if (loginIds.facebookId) {
      user = await getRepository(User).findOne({ where: { facebookId: loginIds.facebookId } });
    } else {
      return done("Authentication object has no valid property");
    }
    if (!user) return done("User doesnt exist");
    delete user.password;
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
