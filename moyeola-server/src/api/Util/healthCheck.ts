export default {
  Query: {
    hello: (_: null, { name }: { name: string }) => `Hello ${name || 'World'}`,
  },
};
