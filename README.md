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
yarn add @babel/core @babel/node @babel/preset-env
yarn add dotenv morgan nodemon
yarn add prisma-client-lib
yarn add nodemailer nodemailer-sendgrid-transport
yarn add passport passport-jwt jsonwebtoken
//인증 전반적인과정을 다루는 모듈 | 인증 전략 jwt | jwt 토큰 생성


    "babel-node": "^0.0.1-security", ??



```

# 1 Project Set Up && Prisma Data Model Set Up

[Section01_02.md](./Docs/Section01_02.md)
[Section03.md](./Docs/Section03.md)

# 4 Frontend Setup

# 4.0 CRA Cleanup and Installation (5:45)

# 4.1 GlobalStyles and Theme (12:06)

# 4.2 React Router (9:15)

# 4.3 Apollo Client (12:06)

# 4.4 First Hooks Query (8:02)
