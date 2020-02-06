import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, args) => {
      const { name } = args;

      //일딴은 user만 하면, posts를 안준다는거. - 1.user에서 posts를 그냥 얻어오는건 안됨 (반드시 서브 필드를 선택해야한다.) 2. 근대 선택하면 post는 null값으로 반환된다.(애러)
      const user = await prisma.user({ name });
      const posts = await prisma.user({ name }).posts();
      return {
        user,
        posts
      };
    }
  }
};
