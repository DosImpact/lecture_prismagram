# 프리즈마 데이터 모델 하나가 저절로 만드는 것들

- 다음 기본적으로 추가

```
type User {
  id: ID! @id
  name: String!
}

```

- 쿼리 생성

```
users(...): [User]! // 유저 목록들, 정렬기능,스킵넘버,after/before, first,last
user(...): User // user의 유니크로 찾기
usersConnection(...): UserConnection!

node(...): Node
```

- 뮤테이션 생성

```
createUser(...): User!
updateUser(...): User
deleteUser(...): User
upsertUser(...): User! //없으면 만들고, 있다면 업데이트
updateManyUsers(...): BatchPayload! //대량 업데이트
deleteManyUsers(...): BatchPayload! // 대량 삭제

```

- subscription 생성

```

user(...): UserSubscriptionPayload //변화시 구독

```
