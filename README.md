# prismagram

instaclone Nomad

# 1 Set Up

# 1.0 Setting up the project (6:04)

- git 연결하기
- yarn init //package.json 파일이 생긴다.
- yarn add graphql-yoga //
- yarn add nodemon -D //파일을 저장할때마다 실행을 새로 해주는 도구 ( -D 옵션은 개발시 의존성 )
- yarn add babel-node //멋진 코드들을 못생긴 코드로 바꿔주는 역활
- Skip this (yarn add bable-cli -D //멋진 코드들을 못생긴 코드로 바꿔주는 역활)

- src/server.js추가 console.log

- nodemon은 자동으로 서버를 가동시켜주는 서드파티모듈 | js graphql 를 다음과 같이 설정하여 같이 실행되도록 한다.!

```js
//nodemon.json 생성후 다음 추가
{
  "ext": "js graphql"
}

```

- package.json에 다음 명령어 추가: nodemon을 실행기키면, babel-node로 다음 server.js를 실행시키게 됨.

```js
  "scripts": {
    "dev": "nodemon --exec babel-node src/server.js"
  }
```

# 1.1 Creating GraphQL Server (6:05)

## dotenv

- yarn add dotenv
- //.env폴더를 읽어주는 모듈, 코드에서 설정부분은 따로 .env 에 빼주는 좋은습관을 들이도록.
- VS Code Extension => dotenv syntax 설치

- .env 추가.

```
PORT = 4000
```

## babel 추가하기

- yarn add @babel/node
- yarn add @babel/preset-env
- yarn add @babel/core
- Skip this (yarn remove babel-cli)

* .babelrc 를 추가해서 프리셋을 설정하자.

```
{
  "presets": ["@babel/preset-env"]
}

```

## make graphQL yoga Server : src/server.js

```js
require("dotenv").config();
import { GraphQLServer } from "graphql-yoga";

const PORT = process.env.PORT || 4000;

const typeDefs = `
    type Query{
        hello: String!
    }
`;

const resolvers = {
  Query: {
    hello: () => "Hi"
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start({ port: PORT }, () =>
  console.log(`Server running on  http://localhost:${PORT}`)
);
```

# 1.2 Setting Up the Server like the Pros (11:17)

## morgan설치하기.

- yarn add morgan
- // 멋진 로깅전용모듈 logger가 실상 morgan이다. | express서버를 내장하는데 start 전에 logger를 주면 된다.

```js

import logger from "morgan";
...
const server = new GraphQLServer({ typeDefs, resolvers });

server.express.use(logger("dev"));
server.start({ port: PORT }, () =>
  console.log(`Server running on  http://localhost:${PORT}`)
);
```

- yarn add graphql-tools
- yarn add merge-graphql-schemas@1.7.3
- //garphql에 넘기는 스키마와 리소버를 하나로 만들어 주려면 필요.

- src|api| 하위에 .graphql 과 .js 를 스키마와, 리소버를 두자.!

- 로거 연결해서 실시간으로 서버 상황 로깅 | 스키마 임포트해서 graphql 한번만 임포트 하기 |

```js
require("dotenv").config();
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

server.express.use(logger("dev"));
server.start({ port: PORT }, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
```

## 스미카와 리소버를 끌어와서 하나로 뭉처주기

```js
import path from "path";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";

//api안의 하위 모든 폴더를 선택해서 **는 모든폴더, *.js는 해당 모든 확장자 파일을 선택하자.
//반드시 api하위 폴더에는 리소버만 둘것!!.
const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers)
});

export default schema;

/**
 * api하위 폴더의 모든 리소버와 스키마를 모아서,  하나로 뭉처서 export하자.
 * graphql-tools -> makeExecutableSchema <= typeDefs,resolvers
 * merge-graphql-schemas -> fileLoader, mergeResolvers, mergeTypes
 * fileLoader를 통해, 스키마와 리소버를 모으자.
 * 모든 두 파일을 merge해서 스키마로 뺴자.
 */
```

## api 예시

- 리소버 예시

```js
export default {
  Query: {
    sayGoodbye: () => "Bai"
  }
};
```

- 스키마 예시

```js
type Query {
  sayGoodbye: String!
}

```

# 2.0 Introduction to Prisma (6:44)

## prisma란?

- ORM 이다. Object relational mapping. 한번 정의를 해두면, 프리즈마 어드민 페이지와 graphQL 플레이 그라운드를 제공해준다.

## prisma 설치 및 로그인

- (npm install -g prisma) //한번 글로벌로 설치 해 놨어.
- prisma login -k //홈페이지에서 복붙해오기. eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjazRtbWN3N3B6dmZnMDg2MTFpZGd0amVhIiwiaWF0IjoxNTc3MzU4MjIxLCJleHAiOjE1Nzk5NTAyMjF9.GuvsxS8JiUJ97bWyOW-8_14xrcFgx2Lo0p3jru4pdgA
- prisma init // 데모 서버+ SQL로 만들고, JS 클라이언트로 설정
- .gitignore에 generated 추가.
- prisma deploy // datamodel.prisma의 모델이 서버로 업로드 된다.
- package.json에 "deploy": "prisma deploy" 스크립트 추가.

# 2.1 Datamodel with Prisma (11:06)

pass

# 2.2 Testing Prisma OMG (12:53)

## 다음과 같이 prisma 모델 작성하기.

```json
type User {
   id: ID! @id
   name: String! @unique
   email: String! @unique
   firstName: String @default(value: "")
   lastName: String
   bio: String
   following: [User!]! @relation(name: "FollowRelation")
   followers: [User!]! @relation(name: "FollowRelation")
   posts: [Post!]!
   likes: [Like!]!
   comments: [Comment!]!
   rooms: [Room!]!
 }

type Post {
  id: ID! @id
  location: String
  caption: String!
  user: User!
  files: [File!]!
  likes: [Like!]!
  comments: [Comment!]!
}

type Like {
  id: ID! @id
  user: User!
  post: Post!
}

type Comment {
  id: ID! @id
  text: String!
  user: User!
  post: Post!
}

type File {
  id: ID! @id
  url: String!
  post: Post!
}

type Room {
  id: ID! @id
  participants: [User!]!
  messages: [Message!]!
}

type Message {
   id: ID! @id
  text: String!
  from: User! @relation(name: "From")
  to: User! @relation(name: "To")
  room: Room!
}
```

## prisma는 모델을 작성하면, 어드민 패널과 플레이 그라운드까지 다 만들어 준다.

[https://us1.prisma.sh/ypd03008-152cfe/prismagram/dev](https://us1.prisma.sh/ypd03008-152cfe/prismagram/dev)

- playground에서 유저 추가해 보기.

```js
mutation{
  createUser(data:{name:"doyoung kim" , email:"ypd03008@gmail.com"}){
    id
  }
}
```

- id를 통해 user의 이름 찾아내기.

```js
{
  user(where:{id:"ck5aqmzkyouap0b0933vqydbx"}){
    name
  }
}
```

- id를 통해 user의 정보 업데이트

```js
mutation{
  updateUser(data:{firstName:"DoYoung", lastName:"Kim"} where:{id:"ck5aqmzkyouap0b0933vqydbx"}){
    id
    name
    email
    firstName
    lastName
  }
}
```

- id를 통해, kim doyoung 이 nicolas 팔로우 하게

```js

mutation{
  updateUser(
    data:{following:{connect:{id:"ck5aqiha9ado80b00ou1clnr5"}}}
    where:{id:"ck5aqmzkyouap0b0933vqydbx"}
  ){
    id
    name
    firstName
    lastName
    following{
      id
    }
    followers{
      id
    }
  }
}
```

- 그러면 nicolas는 팔로워에 추가 된다.

```

{
  user(where:{id:"ck5aqiha9ado80b00ou1clnr5"}){
    id
    name
    following{id}
    followers{id}
  }
}
```

# 2.3 Integrating Prisma in our Server (5:48)

## Prisma와 현재 컴퓨터의 graphQL 요가 서버 연동하기.

- .gitignore에 prisma.yml 추가. 올리면 안되는 이유는 플레이 그라운드가 있기 때문이다.
- 프리즈마 디폴로이후 -> 클라우드에 올라간 prisma client를 다운받아야 한다. -> generate명령어 추가. "prisma generate"
- yarn add prisma-client-lib

- front-end 에서 우리 서버로 요청을 하면 -> 프리즈마 서버로 데이터를 요청하고 -> 다시 front-end로 전달한다.

```js
//sayHello.js
import { prisma } from "../../../../generated/prisma-client";
export default {
  Query: {
    sayHello: async () => {
      console.log(await prisma.users());
      return "HELLO";
    }
  }
};
```

# 2.4 Resolvers with Prisma (7:54

### prisma 데이터모델을 우리 서버에도 복사하기.

- api에 models.graphql 에 datamodel.prisma 추가하고, prisma문법 요소 빼기

### 모든 유저를 검색하는 API , id를 통해 user를 검색하는 API 추가하기.

- User라는 큰 폴더의 하위에 allUser,userById, 각각 리소버, graphql넣기.

### prisma에서 user->post->id->user->id-> ... 등등으로 공격을 안받기위해, prisma-client는 이를 막는다. \$fragment라는 옵션으로 해결.

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

# 3.3 sendMail Function with Nodemailer (12:32)

# 3.4 Passport JWT part One (11:58)

# 3.5 Passport JWT part Two (9:58)

# 3.6 Passport JWT part Three (16:09)

# 3.7 toggleLike Resolver part One (8:25)

# 3.8 toggleLike and addComment Resolver (7:52)

# 3.9 searchUser and searchImage resolver (8:26)

# 3.10 follow unfollow Resolver (7:34)

# 3.11 editUser seeUser Resolver (8:10)

# 3.12 me Resolver + Prisma's Limitations (11:39)

# 3.13 See Full Posts (9:17)

# 3.14 Computed Fields in Prisma (7:56)

# 3.15 itsMe and amIFollowing Fileds part One (10:24)

# 3.16 itsMe and amIFollowing Fileds part Two (8:49)

# 3.17 isLiked Computed File (4:51)

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
