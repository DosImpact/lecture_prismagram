import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    //낯설다.: rule: Class적인 변수의 개념과, inst적인 변수의 개념이 있다.
    // parent는 어떠한 Post의 인스턴스고, request의 있는 user도 마찬가지.
    // prisma.은 class적인 느낌으로, 모든 inst에서 찾는다.
    isLiked: (parent, _, { request }) => {
      const { user } = request; //현재 접속중인 유저
      const { id } = parent; //어떤 포스트
      //fb) AND가 아닌 OR의 논리로 생각했다. = 나는 어떤 좋아요를 누른적이 있다. , 어떤 좋아요는 Post에 달렸다.
      // 어떤 좋아요 = {사용자 = 나 }(&& 이고) { 해당 포스트에 되있다면.. }
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id
            }
          }
        ]
      });
    },
    likeCount: parent =>
      prisma
        .likesConnection({
          where: { post: { id: parent.id } }
        })
        .aggregate()
        .count(),
    commentCount: parent =>
      prisma
        .commentsConnection({
          where: { post: { id: parent.id } }
        })
        .aggregate()
        .count()
  }
};
