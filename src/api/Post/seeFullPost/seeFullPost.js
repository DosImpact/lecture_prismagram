import { prisma } from "../../../../generated/prisma-client";
import { COMMENT_FRAGMENT, FULL_POST_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { id } = args;
      // const post = await prisma.post({ id });
      // //id를 통해 post를 검색한 결과 comments들을 가져와 그들은 Comment 배열이라서 fragment가 필요하다.
      // const comments = await prisma
      //   .post({ id })
      //   .comments()
      //   .$fragment(COMMENT_FRAGMENT);
      // //포스트의 아이디를 통해 likes들을 가져와서 합을 구함. aggregate == 집합체 ? 배열이라 생각하자.
      // const likeCount = await prisma
      //   .likesConnection({
      //     where: { post: { id } }
      //   })
      //   .aggregate()
      //   .count();
      // const files = await prisma.post({ id }).files();
      // const user = await prisma.post({ id }).user();
      // return {
      //   post,
      //   comments,
      //   likeCount,
      //   files,
      //   user
      // };
      return prisma.post({ id }).$fragment(FULL_POST_FRAGMENT);
    }
  }
};
