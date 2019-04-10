import * as Joi from "joi";

const middleware = {
  async Mutation(resolve, root, args, context, info) {
    const mutationResolverObject = info.schema.getMutationType().getFields()[info.fieldName];
    const schema = Joi.object().keys(mutationResolverObject.rules);

    const { error } = Joi.validate(args, schema);
    if (error) throw error; // TODO Return a clearer error message

    return await resolve(root, args, context, info);
  }
};

export default middleware;
