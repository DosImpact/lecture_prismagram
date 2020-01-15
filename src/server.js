import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";

const PORT = process.env.PORT || 4000;

//context는 모든 리소버에서 공동으로 사용하는 데이터를 넣어준다. - request 정보랑, 미들웨어의 사용자 인증여부.
const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request })
});

//server.express.use(passport.authenticate("jwt")); // 잘 모르겠어...
server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);

/**
 * 설정파일에서 포트번호를 불러오거나 또는 4000으로 설정한다. path에서 __dirname 가져오고, .env 연결 시켜주기.
 * ( <1>&&<2>&&<3>&& 의 논리는 1이 만족되고 2도 만족된다면 3도 가즈아.. 반대의 논리면, 1아니면, 2로 하면되지. 뭐든.. )
 * GraphQLServer를 스키마를 넣고 실행시킨다.
 * express서버를 가져와서 morgan의 logger를 사용해서 실행시킨다.
 * server.start 에 포트를 넣고 실행. 콜백함수로는 잘 실행되괴 있다는 메시지(url) 출력.
 */
