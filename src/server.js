import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";

import os from "os";
import cluster from "cluster";
import { uploadController, uploadMiddleware } from "./upload";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.post("/api/upload", uploadMiddleware, uploadController);

const numCPUs = os.cpus().length;

server.start({ port: PORT }, () =>
  console.log(
    `✅ ${process.pid} pid / CPUs: ${numCPUs} --> Server running on http://localhost:${PORT}`
  )
);

// const numCPUs = os.cpus().length;

// if (cluster.isMaster) {
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
//   cluster.on("exit", (Worker, code, signal) => {
//     console.log(Worker.process.pid, ": --> Worker is ended & restart");
//     cluster.fork();
//   });
// } else {
//   const PORT = process.env.PORT || 4000;

//   //context는 모든 리소버에서 공동으로 사용하는 데이터를 넣어준다. - request 정보랑, 미들웨어의 사용자 인증여부., prisma를 넣어서 사용해도 된다.
//   //context에는 함수를 쓸수 있는데, request가 담겨 있다.
//   const server = new GraphQLServer({
//     schema,
//     context: ({ request }) => ({ request, isAuthenticated }) // context의 req객체안에 passport의 request객체가 있다.
//   });
//   server.express.use((req, res, next) => {
//     console.log(`--> Process pid:${process.pid}`);
//     next();
//   });
//   //이 모든 미들웨어를 통과한다.
//   server.express.use(logger("dev")); //미들웨어 - 다적고 마지막에 jwt 미들웨어 적기
//   //server.express.use(passport.authenticate("jwt")); // 목적: 어떤 경로들을 jwt인증받은 사람만 들여보내고 싶어
//   //eg) server.express.use('/api',passport.authenticate("jwt")); //이거는 /api 이하 모든 경로를 jwt 인증통과한 사람만 공개!
//   server.express.use(authenticateJwt);

//   server.start({ port: PORT }, () =>
//     console.log(
//       `✅ ${process.pid} pid --> Server running on http://localhost:${PORT}`
//     )
//   );
// }
