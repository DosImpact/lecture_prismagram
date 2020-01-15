논리장

# 프로젝트 셋팅하기.

graphql-yoga, graphql-tools, merge-graphql-schemas@1.7.3
nodemon => ext:"js graphql" 두개 모니터링
bable-node,@bable/node,@bable/preset-env,@bable/core => .babelrc 프리셋 설정
dotenv
morgan // server.express.use(logger("dev")); 멋진 로깅 툴
prisma,prisma-client-lib,
nodemailer, nodemailer-sendgrid-transport
jsonwebtoken

# GraphQL 과 Resolver 한번에 뭉처서 schema 만들어서 express서버 실행시키기

# 프리즈마 데이터 모델 짜기. -사용자:이름,이메일,firstName,LastName,bio,팔로워,팔로잉,포스트,라이크,커맨트,룸,로긴시크릿 -포스트:위치,캡션,사용자,파일,좋아요,댓글 -좋아요:사용자와 포스트 -댓글:사용자와 포스트, 내용 -파일:url ,포스트 -채팅룸:참가자들,메시지들 -메시지:내용,from,to,채팅룸

type 선언후 String|ID|[ ]배열 등등
커스텀 타입 : Post,Like, Comment, File, Room, Message
@id,@unique,@relation

# 추가학습 : 서버 인증에 대해서 기본지식

//인증이 필요한 이유, 프론트 관점에서 보면, 로그인,회원가입등 사용자의 도입부분이다. 서버 사이드 관점에서는 모든 API요청에 대해 사용자를 확인하는 작접
//HTTP로 요청을 보내는데, 헤더에는 인증 수단을 넣고 바디엔 데이터를 넣겠지.
//여러가지 인증 방식이 있다.

//1. id,pw를 헤더에 넣는다.
//제일 간단하지만 보안에 너무나 취약한 방식 - HTTP 요청에서 다 노출되고, 패킷을 가로채면 바로 뚤림. HTTPS방식이 있어도 안쓴다. 개발단계에서는 테스트용으로 쓰일수 있다.

//2. 세션과 쿠키 방식
//사용자가 로그인을 하면, 회원 DB에서 확인을 하고, 해당 세션 생성및 ID를 발급해서 응답해준다.
//사용자는 세션이 들어있는 쿠키를 이용해서 서버에 요청하면, 쿠기를 검증하고 ok라면 유저 정보를 얻고 요청 데이터를 응답해준다.

//3. JWT 방식
// 토큰(3개의 정보들이 암호화가 되어 왔다갔다할 실제 정보) = Header + Payload + Verify Signature 가 필요하다.

// Header 에서는 암호화할 방식,타입(jwt) , Payload: 서버에서 보낼 데이터가 들어감, Verify Signature : Base64방식으로 인코딩한 헤더와 페이로드,시크릿 키를 더함.

//#너무 어렵다 JWT는 다시 중무장하고, 다시 여러번 보자....

server.express.use에서 authenticateJwt함수를 통과하면서 실행된다.
passport.autenticate를 통과해서(세션은 없이,)
토큰을 추출하는 과정을 거친다.
그리고 토큰이 추출이 되면 , payload에서 해석된 id를 받아서 user를 prisma에서 가져온다.
그거를 request를 담아서, graphql의 정보공유 context에 싣는다.

# 연습: GraphQLServer 만들기.

```js
require("dotenv").config();
import {GraphQLServer } from "graphql-yoga";
const PROT = process.env.PORT || 4000;
const typeDefs= `
    type Query{
        hello:String!
    }
`;
const resolvers = {
    Query:{
        hello: () => "HI"
    }
};
const server = new GraphQLServer({typeDefs,resolvers});
server.start({port:PROT}, () => console.log(`Server is running on http://localhost:400));
```

//칭찬 : BFS문제와 BF 문제 실버 2따리 연습한거 축하해.. 난이도는 그냥 쉬움이지 뭐.

//질문 : 팔로워 팔로우 릴레이션관계 아직도 이해 안됨..
