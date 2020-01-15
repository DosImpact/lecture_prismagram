import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    me: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const userProfile = await prisma.user({ id: user.id });
      const posts = await prisma.user({ id: user.id }).posts();
      return {
        user: userProfile,
        posts
      };
    }
  },
  //리소버에 커스텀 타입+필드 가 있는경우 : parent는 상위 user를 부른 모든 리소버가 될수 있다. - parent는 그 리소버를 부른다.
  User: {
    fullName: (parent, __, { request, isAuthenticated }) => {
      //첫번째 인자:부모 , 두번쨰는 args, 세번쨰는 문맥
      //parent는 꼭 위의 Query:me가 아니더라도 User.fullName을 요청했던 모든 리소버가 될 수 있다.
      //console.log(parent);
      return `${parent.firstName} ${parent.lastName}`;
    }
  }
};
