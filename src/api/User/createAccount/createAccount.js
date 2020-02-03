import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { name, email, firstName = "", lastName = "", bio = "" } = args;
      // const exists = await prisma.$exists.user({ OR:[{name},{email}]})
      const existsName = await prisma.$exists.user({ name });
      if (existsName) {
        throw Error("this name is already taken!");
      }
      const existsEmail = await prisma.$exists.user({ email });
      if (existsEmail) {
        throw Error("this email is already taken!");
      }
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
