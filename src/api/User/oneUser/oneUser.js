import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    oneUser: async (_, args) => {
      const { id } = args;
      return prisma.user({ id: id });
    }
  }
};
