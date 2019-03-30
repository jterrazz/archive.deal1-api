const middleware = {
  async Query(resolve, root, args, context, info) {
    return await resolve(root, args, context, info);
  }
};

export default middleware;
