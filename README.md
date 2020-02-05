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

## 환경 설정 - Grapqh + Prisma 를 기본 프로젝트 셋팅으로 가져가자.

```js
yarn add graphql-yoga graphql-tools merge-graphql-schemas@1.7.3
yarn add @babel/core @babel/node @babel/preset-env nodemon -D
yarn add dotenv morgan
yarn add nodemailer nodemailer-sendgrid-transport
yarn add passport passport-jwt jsonwebtoken
yarn add prisma-client-lib
(yarn add prisma -g)
```

```js
prisma login -k // by 홈페이지에서 service 추가후
prisma init // 홈페이지 설명서 대로 따라 -> demo 서버 선택 -> js 클라이언트 -> 끝!
prisma deploy
prisma generate
```

```js
//nodemon.json
{
  "ext": "js graphql"
}

```

```js
//.babelrc
{
  "presets": ["@babel/preset-env"]
}

```

```js
//설치후 package.json
{
  "name": "Grapqhl",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "dotenv": "^8.2.0",
    "graphql-tools": "^4.0.6",
    "graphql-yoga": "^1.18.3",
    "jsonwebtoken": "^8.5.1",
    "merge-graphql-schemas": "1.7.3",
    "morgan": "^1.9.1",
    "nodemailer": "^6.4.2",
    "nodemailer-sendgrid-transport": "^0.2.0",
    "passport": "^0.4.1",
    "passport-jwt": "^4.0.0",
    "prisma-client-lib": "^1.34.10"
  },
  "devDependencies": {
    "@babel/core": "^7.8.4",
    "@babel/node": "^7.8.4",
    "@babel/preset-env": "^7.8.4",
    "nodemon": "^2.0.2"
  },
  "scripts": {
    "dev": "nodemon --exec babel-node src/server.js",
    "generate": "prisma generate",
    "deploy": "prisma deploy",
    "prisma": "yarn run deploy && yarn run generate"
  }
}

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

## prisma 사용법 정리

### playground에서 유저 추가해 보기.

```js
mutation{
  createUser(data:{name:"doyoung kim" , email:"ypd03008@gmail.com"}){
    id
  }
}
```

### id를 통해 user의 이름 찾아내기.

```js
{
  user(where:{id:"ck5aqmzkyouap0b0933vqydbx"}){
    name
  }
}
```

### id를 통해 user의 정보 업데이트

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

### id를 통해, kim doyoung 이 nicolas 팔로우 하게

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
