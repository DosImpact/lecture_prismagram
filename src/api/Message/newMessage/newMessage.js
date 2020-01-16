import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    newMessage: {
      //기존의 쿼리,mutation과 다르게, subscribe( 조건 ),resolve(결과 가공 전달) 을 정의 해야한다.
      subscribe: (_, args) => {
        const { roomId } = args;
        return prisma.$subscribe
          .message({
            AND: [
              { mutation_in: "CREATED" },
              {
                node: {
                  room: { id: roomId }
                }
              }
            ]
          })
          .node();
      },
      //
      resolve: payload => payload
    }
  }
};
