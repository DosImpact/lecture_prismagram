import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, args) => {
      const { name } = args;
      return prisma.user({ name });
    }
  }
};
