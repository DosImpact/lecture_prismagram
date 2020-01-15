# prismagram

instaclone Nomad

# 1 Project Set Up && Prisma Data Model Set Up

[Section01_02.md](./Docs/Section01_02.md)

# 3 GraphQL API

# 3.0 Planning the API (4:59)

- [ ] Log in
- [ ] Like / Unlike a photo
- [ ] Comment on a photo
- [ ] Search by user
- [ ] Search by location
- [ ] See user profile
- [ ] Follow / Unfollow User
- [ ] See the full photo
- [ ] Edit my profile
- [x] Create account
- [ ] Upload a photo
- [ ] Edit the photo (Delete)
- [ ] See the feed

# 3.1 Create Account Resolver (7:32)

### 프리즈마의 스키마를 보고, createUser를 이용해서, 클라이언트에서 createAccount작성하기.

# 3.2 requestSecret Resolver (13:48)

- 데이터 모델을 수정할때, loginSecret: String! 처럼 필수 항목으로 업뎃을 하면, 기존의 항목들은 없으므로 애러 -> loginSecret: String! default(value:"") 디폴트 설정으로 가능.!

### updateUser를 통해, loginSecret 랜덤 제너레이트 해서 얻어와 유저업데이트 해주기.

# 3.3 sendMail Function with Nodemailer (12:32)

### 이메일 보내는 서드파티 추가하기.

- yarn add nodemailer
- yarn add nodemailer-sendgrid-transport
  [https://app.sendgrid.com/account/details](https://app.sendgrid.com/account/details)
  [https://sendgrid.com/blog/sending-email-nodemailer-sendgrid/](https://sendgrid.com/blog/sending-email-nodemailer-sendgrid/)

- 시크릿 키를 만들어서 이메일을 보내고, 그 키를 해당 유저의 sercetKey데이터를 업데이트한다.

# 3.4 Passport JWT part One (11:58)

### JWT(JSON Web Token) 인증 방식으로 계정인증을 하려고함.

[http://www.passportjs.org/packages/passport-jwt/](http://www.passportjs.org/packages/passport-jwt/)

- yarn add passport passport-jwt

continue

# 3.5 Passport JWT part Two (9:58)

### JWT 생성하기.

- yarn add jsonwebtoken

# 3.6 Passport JWT part Three (16:09)

### 하..... JWT는 어렵다. 설명도 부족하고, 하튼 토큰을 서버에서 퉤 하고 던지면, User는 그거를 가지고 로그인을 시도하고, 서버에서 인증을 하는 방식...

# 3.7 toggleLike Resolver part One (8:25)

### toggleLike 리소버 만들기.

- Post/toggleLike에 리소버와 스키마 만들기.
- 참고 문서...
  [https://www.prisma.io/docs/prisma-client/features/check-existence-JAVASCRIPT-pyl1/](https://www.prisma.io/docs/prisma-client/features/check-existence-JAVASCRIPT-pyl1/)

# 3.8 toggleLike and addComment Resolver (7:52)

# 3.9 searchUser and searchImage resolver (8:26)

# 3.10 follow unfollow Resolver (7:34)

# 3.11 editUser seeUser Resolver (8:10)

- async함수내에서 마지막으로 return할땐 await를 사용할 필요가없다. promise가 리턴되면 자동으로 resolve되어서 전달.
- prisma에서 updateUser할때 null값들로 넣어주면, 기존의 변수들이 유지가 된다.

# 3.12 me Resolver + Prisma's Limitations (11:39)

# 3.13 See Full Posts (9:17)

# 3.14 Computed Fields in Prisma (7:56)

# 3.15 itsMe and amIFollowing Fileds part One (10:24)

# 3.16 itsMe and amIFollowing Fileds part Two (8:49)

# 3.17 isLiked Computed File (4:51)

# 3.18 upload Resolver (12:26)

# 3.19 seeFullPost Refactoring (15:45)

# 3.20 editPost deletePost Resolver (11:14)

# 3.21 deletePost Resolver part Two (11:46)

# 3.22 seeFeed Resolver (10:33)

# 3.23 sendMessage part One (15:07)

# 3.24 sendMessage part Two (13:05)

# 3.25 seeRoom Resolver (11:00)

# 3.26 Introduction to Subscriptions (4:47)

# 3.27 newMessage Subscription part One (11:27)

# 3.28 newMessage Subscription part Two (13:21)

# 3.29 Conclusions (7:54)

# 3.30 Kill The Fragments 🔥 (5:54)
