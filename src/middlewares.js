export const isAuthenticated = request => {
  if (!request.user) {
    throw Error("You need to log in to perform this action");
  }
  return;
};
/**
 * request에 user객체가 없다면 그냥 애러 던저주기.
 * 토글 라이크에 사용.
 */
