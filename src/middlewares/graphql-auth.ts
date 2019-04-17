import * as _ from "lodash";

export enum AuthRoles {
  User = "user"
}

async function checkAuthConditions(condition, user): Promise<void> {
  if (condition === AuthRoles.User && !user) {
    throw "Not authentified"; // TODO Do better errors
  }
}

const middleware = {
  async Query(resolve, root, args, ctx, info) {
    const authConditions = _.get(info.schema.getQueryType().getFields(), `${info.fieldName}.auth`);
    await checkAuthConditions(authConditions, ctx.user);

    return await resolve(root, args, ctx, info);
  },

  async Mutation(resolve, root, args, ctx, info) {
    const authConditions = _.get(info.schema.getMutationType().getFields(), `${info.fieldName}.auth`);
    await checkAuthConditions(authConditions, ctx.user);

    return await resolve(root, args, ctx, info);
  }
};

export default middleware;
