import * as Router from "koa-router";

import { authWithJwt, authWithFacebook, authWithFacebookCallback } from "./auth";

export const router = new Router();

// router.use(authWithJwt()); // Delete if delete

router.get("/auth/facebook", authWithFacebook());
router.get("/auth/facebook/callback", authWithFacebookCallback(), ctx => {
  ctx.body = "ok";
});
