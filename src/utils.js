import { adjectives, nouns } from "./words";

import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken"; //jwt를 생성해주는 모듈이다.

//api-requestSecret
export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};
//api-requestSecret
export const sendSecretMail = (adress, secret) => {
  const email = {
    from: "ehdudtkatka@prismagram.com",
    to: adress,
    subject: "🔒Login Secret for Prismagram🔒",
    html: `Hello! Your login secret it ${secret}.<br/>Copy paste on the app/website to log in`
  };
  return sendMail(email);
};
//JWT 생성부분. //User id를 받아 토큰에 저장. | sign함수( payload = 문자열 -> User의 id를 사용 , 시크릿키 똔느 프라이빗 키) => 결과 JWT 토큰 뽕!
//암호화 및 복호화에 같은 private key를 사용한다. 그러기에 .env의 비밀키는 공개하면 안됌!
export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);

/**
 * words에서 단어들을 가져와서, 0~1랜덤에다 단어길이 곱하면 랜덤 인덱스가 나옴. ->`` 을 통해 문자열을 꾸며준다.
 */
