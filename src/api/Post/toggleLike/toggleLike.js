import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";
/**
 * 커스텀 미들웨어를 만들어서, request 토큰을 퉤 던지면, 해당 유저가 있는지 없는지 판단해 준다.
 * 처음에 user가 있는지 없는지 판단하기. 해당 오류가 생기면 없고, 해당 리소버가 중지될것임.
 * prisma.$exists 존재하는지 아닌지 판단하는 문법.
 * request에는 user가 있으므로, 해당 유저가 post에 좋아요를 이미 했다면, 없애고, 처음이라면 좋아료를 create 해준다.
 */

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      const filterOptions = {
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
      };
      try {
        //결과는 true / false
        const existingLike = await prisma.$exists.like(filterOptions);
        if (existingLike) {
          // TO DO - Like지우기.. Like의 아이디를 찾거나, 또는 조건에 해당하는 모든 Like를 지워야되.
          await prisma.deleteManyLikes(filterOptions);
        } else {
          await prisma.createLike({
            //Like 만들기.
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
