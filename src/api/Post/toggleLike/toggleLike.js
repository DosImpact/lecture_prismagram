import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";
/**
 * 커스텀 미들웨어를 만들어서, request 토큰을 퉤 던지면, 해당 유저가 있는지 없는지 판단해 준다.
 * request에는 user가 있으므로, 해당 유저가 post에 좋아요를 이미 했다면, 없애고, 처음이라면 좋아료를 create 해준다.
 */
export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      try {
        const existingLike = await prisma.$exists.like({
          AND: [
            {
              user: {
                id: user.id
              }
            },
            {
              post: {
                id: postId
              }
            }
          ]
        });
        if (existingLike) {
          // TO DO
        } else {
          await prisma.createLike({
            user: {
              connect: {
                id: user.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            }
          });
        }
        return true;
      } catch {
        return false;
      }
    }
  }
};
