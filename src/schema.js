import path from "path";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";

//api안의 하위 모든 폴더를 선택해서 **는 모든폴더, *.js는 해당 모든 확장자 파일을 선택하자.
//반드시 api하위 폴더에는 리소버만 둘것!!.
const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers)
});

export default schema;

/**
 * api하위 폴더의 모든 리소버와 스키마를 모아서,  하나로 뭉처서 export하자.
 * graphql-tools -> makeExecutableSchema <= typeDefs,resolvers
 * merge-graphql-schemas -> fileLoader, mergeResolvers, mergeTypes
 * fileLoader를 통해, 스키마와 리소버를 모으자.
 * 모든 두 파일을 merge해서 스키마로 뺴자.
 */
