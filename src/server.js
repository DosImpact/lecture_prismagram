import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";

const PORT = process.env.PORT || 4000;

//context는 모든 리소버에서 공동으로 사용하는 데이터를 넣어준다. - request 정보랑, 미들웨어의 사용자 인증여부., prisma를 넣어서 사용해도 된다.
//context에는 함수를 쓸수 있는데, request가 담겨 있다.
const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated }) // context의 req객체안에 passport의 request객체가 있다.
});

//이 모든 미들웨어를 통과한다.
server.express.use(logger("dev")); //미들웨어 - 다적고 마지막에 jwt 미들웨어 적기
//server.express.use(passport.authenticate("jwt")); // 목적: 어떤 경로들을 jwt인증받은 사람만 들여보내고 싶어
//eg) server.express.use('/api',passport.authenticate("jwt")); //이거는 /api 이하 모든 경로를 jwt 인증통과한 사람만 공개!
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

/**
 * ? 왜 env.js를 server.js에 파일임포트 하면 모두 적용된느겆?
 */
