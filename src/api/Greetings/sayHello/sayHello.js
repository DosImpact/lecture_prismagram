import { prisma } from "../../../../generated/prisma-client";
export default {
  Query: {
    sayHello: async () => {
      console.log(await prisma.users());
      return "HELLO";
    }
  }
};

/**
 * 스키마는 api/에 폴더를 만들고, 해당 이름으로 리소버와 스키마를 작성한다.
 *
 */
