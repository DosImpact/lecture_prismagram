# prismagram

instaclone Nomad

# 요약

```
#환경 1. only grapqhl-yoga server
yarn add graphql-yoga node-fetch babel-cli babel-preset-env babel-preset-stage-3 nodemon

{ "presets":["env","stage-3"] }
"scripts":{ "start":"nodemon --exec babel-node index.js"}

#환경 2. apollo client 환경

npx create-react-app movieql-client
yarn add react-router-dom graphql graphql-tag react-apollo@2.5 apollo-boost

#환경 3. grapqhl-yoga server + prisma
```

### 환경 설정

```
(npm install -g prisma)
yarn add graphql-yoga graphql-tools merge-graphql-schemas@1.7.3
yarn add @babel/core @babel/node @babel/preset-env nodemon -D
yarn add dotenv morgan
yarn add prisma-client-lib
yarn add nodemailer nodemailer-sendgrid-transport
yarn add passport passport-jwt jsonwebtoken
yarn add prisma-client-lib

//인증 전반적인과정을 다루는 모듈 | 인증 전략 jwt | jwt 토큰 생성


    "babel-node": "^0.0.1-security", ??



```

# 1 Project Set Up && Prisma Data Model Set Up

[Section01_02.md](./Docs/Section01_02.md)
[Section03.md](./Docs/Section03.md)

### Users 아이디로 여러명 지우기

```js
mutation{
  deleteManyUsers(where:{
    id_in:["ck5bu52stqm3a0b094eqp02gh","ck66g6jsca7ft0b09bqu8whr0"]
  }){
    count
  }
}
```

### User email , user 중복 확인 로직

```js
     // const exists = await prisma.$exists.user({ OR:[{name},{email}]})
      const existsName = await prisma.$exists.user({ name });
      if (existsName) {
        throw Error("this name is already taken!");
      }
      const existsEmail = await prisma.$exists.user({ email });
      if (existsEmail) {
        throw Error("this email is already taken!");
      }
      try
```
