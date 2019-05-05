import * as passportFacebook from "passport-facebook";
import config from "@config";

const FacebookStrategy = passportFacebook.Strategy;

export default new FacebookStrategy(
  {
    clientID: "946090242231146",
    clientSecret: config.services.facebookAppSecret, // TODO in .env
    callbackURL: `http://localhost:3000/auth/facebook/callback`, //`${config.server.rootPath}/auth/facebook/callback`,
    profileFields: ["id", "emails", "name"]
  },
  async (_token, _tokenSecret, profile, done) => {
    try {
      console.log("Facebook authentication returned");
      console.log(_token);
      console.log(profile);
      done(null, { facebookId: profile.id });
    } catch (err) {
      done(err);
    }
  }
);
