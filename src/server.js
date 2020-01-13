import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import { sendSecretMail } from "./utils";

sendSecretMail("ypd03008@gmail.com", "123");
const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

server.express.use(logger("dev"));
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
