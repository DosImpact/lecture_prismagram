# prismagram

instaclone Nomad

# 1 Set Up

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

# 3.4 Passport JWT part One (11:58)

# 3.5 Passport JWT part Two (9:58)

# 3.6 Passport JWT part Three (16:09)

# 3.7 toggleLike Resolver part One (8:25)

# 3.8 toggleLike and addComment Resolver (7:52)

# 3.9 searchUser and searchImage resolver (8:26)

# 3.10 follow unfollow Resolver (7:34)

# 3.11 editUser seeUser Resolver (8:10)

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
