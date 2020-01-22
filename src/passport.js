import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization 헤더에서 jwt를 찾는역활을 한다.
  secretOrKey: process.env.JWT_SECRET //토큰을 암호화 하기위한 문자열이다. 이걸알면 복호화 가능.
};

//콜백함수의 결과 payload 와 done, | done은 사용자를 찾았을때 호출해야 하는 함수이다.
const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id }); //프리즈마는 못찾아도 애러가 아니다. null이라 다음처럼 처리....
    if (user !== null) {
      return done(null, user);
    } else {
      //물론 아이디를 만들 수 있음.
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};
//미들웨어 함수이다. 그래서 req,res,next를 받는다. | passport에 어떤것도 입력되지 않길 원하기 떄문에 sessions | user는 위 verifyUser의 user와 연결된다.
export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { sessions: false }, (error, user) => {
    if (user) {
      req.user = user; //request에 user를 입력한다. verifyUser에서 prisma에서 얻어온 사용자 정보를 request객체에 넣는거지.
    } //express에서는 미들웨어를 지나 라우터가 실행된다.
    next();
  })(req, res, next);

///export const authenticateJwt = (req, res, next) =>FN(req, res, next); 이 같은 구조임... FN이 함수를 리턴해서 바로 실행시키는

passport.use(new Strategy(jwtOptions, verifyUser)); //옵션이 잘 맞으면, JwtStrategy함수가 토큰을 해석하게 된다. 결과 콜백함수
passport.initialize();
/*
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
 */
