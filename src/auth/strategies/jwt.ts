import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "SEFEGNKRGLERGREGRG" // TODO Add secret in settings
};

export default new JWTStrategy(opts, async (jwtPayload, done) => {
  console.log(jwtPayload);
  return done(null, { id: 2 });
});
