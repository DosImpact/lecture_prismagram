# prismagram

instaclone Nomad

# 1 Set Up

# 1.0 Setting up the project (6:04)

- git 연결하기
- yarn init
- yarn add graphql-yoga //
- yarn add nodemon -D //파일을 저장할때마다 실행을 새로 해주는 도구
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

- package.json에 다음 명령어 추가

```js
  "scripts": {
    "dev": "nodemon --exec babel-node src/server.js"
  }
```

# 1.1 Creating GraphQL Server (6:05)

- yarn add dotenv
- //.env폴더를 읽어주는 모듈, 코드에서 설정부분은 따로 .env 에 빼주는 좋은습관을 들이도록.
- .babelrc 를 추가해서 프리셋을 설정하자.

```
{
  "presets": ["@babel/preset-env"]
}

```

- yarn add @babel/node
- yarn add @babel/preset-env
- yarn add @babel/core
- yarn remove babel-cli
- VS Code Extension => dotenv syntax 설치

- make graphQL yoga Server

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

server.express.use(logger("dev"));
server.start({ port: PORT }, () =>
  console.log(`Server running on  http://localhost:${PORT}`)
);
```

# 1.2 Setting Up the Server like the Pros (11:17)

- yarn add morgan
- // 멋진 로깅전용모듈 | express서버를 내장하는데 start 전에 logger를 주면 된다.

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

- 스미카와 리소버를 끌어와서 하나로 뭉처주기

```js
import path from "path";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";

const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers)
});

export default schema;
```

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
