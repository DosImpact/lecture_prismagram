import { prisma } from "../../../../generated/prisma-client";

const SEARCH_POSTS_FG = `
  fragment FILES on Post{
    files {
      url
    }
  }
`;

export default {
  Query: {
    searchPost: async (_, args) =>
      prisma
        .posts({
          where: {
            OR: [
              { location_starts_with: args.term },
              { caption_starts_with: args.term }
            ]
          }
        })
        .$fragment(SEARCH_POSTS_FG)
  }
};
