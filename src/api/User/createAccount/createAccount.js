import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { name, email, firstName = "", lastName = "", bio = "" } = args;
      try {
        const user = await prisma.createUser({
          name,
          email,
          firstName,
          lastName,
          bio
        });
        return true;
      } catch (error) {
        return false;
      }
    }
  }
};
/**
 * Mutation을 리소버 하는데,인자들을 받는데, null인 경우에는 디폴드 변수를 설정하고, prisma.createUser를 통해 유저 만들기
 */
