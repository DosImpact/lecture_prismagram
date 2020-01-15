# prismagram

instaclone Nomad

# 1 Project Set Up && Prisma Data Model Set Up

[Section01_02.md](./Docs/Section01_02.md)

# 3 GraphQL API

# 3.0 Planning the API (4:59)

- [ ] Log in
- [ ] Like / Unlike a photo
- [ ] Comment on a photo
- [ ] Search by user
- [ ] Search by location
- [ ] See user profile
- [ ] Follow / Unfollow User
- [ ] See the full photo
- [ ] Edit my profile
- [x] Create account
- [ ] Upload a photo
- [ ] Edit the photo (Delete)
- [ ] See the feed

# 3.1 Create Account Resolver (7:32)

### 프리즈마의 스키마를 보고, createUser를 이용해서, 클라이언트에서 createAccount작성하기.

# 3.2 requestSecret Resolver (13:48)

- 데이터 모델을 수정할때, loginSecret: String! 처럼 필수 항목으로 업뎃을 하면, 기존의 항목들은 없으므로 애러 -> loginSecret: String! default(value:"") 디폴트 설정으로 가능.!

### updateUser를 통해, loginSecret 랜덤 제너레이트 해서 얻어와 유저업데이트 해주기.

# 3.3 sendMail Function with Nodemailer (12:32)

### 이메일 보내는 서드파티 추가하기.

- yarn add nodemailer
- yarn add nodemailer-sendgrid-transport
  [https://app.sendgrid.com/account/details](https://app.sendgrid.com/account/details)
  [https://sendgrid.com/blog/sending-email-nodemailer-sendgrid/](https://sendgrid.com/blog/sending-email-nodemailer-sendgrid/)

- 시크릿 키를 만들어서 이메일을 보내고, 그 키를 해당 유저의 sercetKey데이터를 업데이트한다.

# 3.4 Passport JWT part One (11:58)

### JWT(JSON Web Token) 인증 방식으로 계정인증을 하려고함.

[http://www.passportjs.org/packages/passport-jwt/](http://www.passportjs.org/packages/passport-jwt/)

- yarn add passport passport-jwt

continue

# 3.5 Passport JWT part Two (9:58)

### JWT 생성하기.

- yarn add jsonwebtoken

# 3.6 Passport JWT part Three (16:09)

### 하..... JWT는 어렵다. 설명도 부족하고, 하튼 토큰을 서버에서 퉤 하고 던지면, User는 그거를 가지고 로그인을 시도하고, 서버에서 인증을 하는 방식...

# 3.7 toggleLike Resolver part One (8:25)

### toggleLike 리소버 만들기.

- Post/toggleLike에 리소버와 스키마 만들기.
- 참고 문서...
  [https://www.prisma.io/docs/prisma-client/features/check-existence-JAVASCRIPT-pyl1/](https://www.prisma.io/docs/prisma-client/features/check-existence-JAVASCRIPT-pyl1/)

# 3.8 toggleLike and addComment Resolver (7:52)

# 3.9 searchUser and searchImage resolver (8:26)

# 3.10 follow unfollow Resolver (7:34)

# 3.11 editUser seeUser Resolver (8:10)

- async함수내에서 마지막으로 return할땐 await를 사용할 필요가없다. promise가 리턴되면 자동으로 resolve되어서 전달.
- prisma에서 updateUser할때 null값들로 넣어주면, 기존의 변수들이 유지가 된다.

# 3.12 me Resolver + Prisma's Limitations (11:39)

- \_는 변수명이 될수 있지만, \_\_(더블 언더 스코어)는 부모의 인자를 받는것이다.

# 3.13 See Full Posts (9:17)

???? Prisma에서 딥한 쿼리는 제한적이여서, fragments 사용한다는데.., fragment문법 사용하는거랑. 여러번 쿼리하는 방법이 있음.

//일딴은 user만 하면, posts를 안준다는거. - 1.user에서 posts를 그냥 얻어오는건 안됨 (반드시 서브 필드를 선택해야한다.) 2. 근대 선택하면 post는 null값으로 반환된다.(애러)
const user = await prisma.user({ id });
const posts = await prisma.user({ id }).posts();

### 프라그 맨트를 이용해서, 해당 포스트id를 쿼리하면, 포스트와 코맨트 전부, 좋아요 갯수 리턴

```js
type FullPost {
  post: Post!
  comments: [Comment!]!
  likeCount: Int!
}

type Query {
  seeFullPost(id: String!): FullPost!
}
-------------------------------------------------------------
import { prisma } from "../../../../generated/prisma-client";
import { COMMENT_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { id } = args;
      const post = await prisma.post({ id });
      //id를 통해 post를 검색한 결과 comments들을 가져와 그들은 Comment 배열이라서 fragment가 필요하다.
      const comments = await prisma
        .post({ id })
        .comments()
        .$fragment(COMMENT_FRAGMENT);
      //포스트의 아이디를 통해 likes들을 가져와서 합을 구함. aggregate == 집합체 ? 배열이라 생각하자.
      const likeCount = await prisma
        .likesConnection({
          where: { post: { id } }
        })
        .aggregate()
        .count();
      return {
        post,
        comments,
        likeCount
      };
    }
  }
};
-------------------------------------------------------------
export const COMMENT_FRAGMENT = `
    fragment CommentParts on Comment{
        id
        text
        user {
            name
        }
    }
`;

```

# 3.14 Computed Fields in Prisma (7:56)

- computed 필드 = 실제로 데이터 베이스는 아니고, User의 일부분이다. User의 firstName+LastName이 합쳐져 fullName이 되는 경우.

# 3.15 itsMe and amIFollowing Fileds part One (10:24)

- rule1: 데이터 모델은 prisma에 첫번째로 정의되어 있고, 두번째로 models.graphql 클라이언트서버에도 저장되어 있어. prisma 찾고 -> 클라이언트 찾고.
- rule2: merge graphql덕분에, 모든 graphql정의와 리소버가 하나의 파일로 있다고 생각할 수 있다.
- rule3: graphQL 스키마 정의에서는 : Query|Mutation|커스텀 타입 가능 && GraphQL 리소버에는 : Query|Mutation|커스텀 타입 정의 가능 -> 리소버의 커스텀 타입이 이제 부모인자를 쓰는 경우
- rule4: computed field란 아래와 같은 경우임..

### 클라이언트 grpahql-user-fullName 스키마를 리소버의 상속을 이용해서 구해보자.

```js
------------------------------------------------------------------------------------------------------------
1. User의 클라스키마에는 fullName이 있다. prisma에는 없어. 따라서 리소버에서 정의 가능하다.
type User {
...
  firstName: String
  lastName: String
  fullName: String
}
------------------------------------------------------------------------------------------------------------
2. Query me에서 User를 반환해준다.
3. User의 fullName을 요청했는데, prisma에도 없으면 리소버를 더 찾아본다. User의 fullName이 또 정의되어 있다.
import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragments";

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


```

# 3.16 itsMe and amIFollowing Fileds part Two (8:49)

### computed field fullName: String amIFollowing: Boolean! itsMe: Boolean! 추가하기.

# 3.17 isLiked Computed File (4:51)

### 내가 해당 포스트에 좋아요 눌렀는지 확인.

```js
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
  };
}
```

# 3.18 upload Resolver (12:26)

# 3.19 seeFullPost Refactoring (15:45)

# 3.20 editPost deletePost Resolver (11:14)

# 3.21 deletePost Resolver part Two (11:46)

# 3.22 seeFeed Resolver (10:33)

# 3.23 sendMessage part One (15:07)

# 3.24 sendMessage part Two (13:05)

# 3.25 seeRoom Resolver (11:00)

# 3.26 Introduction to Subscriptions (4:47)

# 3.27 newMessage Subscription part One (11:27)

# 3.28 newMessage Subscription part Two (13:21)

# 3.29 Conclusions (7:54)

# 3.30 Kill The Fragments 🔥 (5:54)
