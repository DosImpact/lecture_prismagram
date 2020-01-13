import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        // JWT
        return generateToken(user.id);
      } else {
        throw Error("Wrong email/secret combination");
      }
    }
  }
};

/**
 * user.id를 통해서 JWT 를 생성한다. => passport를 지나가고 => JWT를 해석하면 끝!
 */
