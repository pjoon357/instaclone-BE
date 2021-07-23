import { loadFilesSync, makeExecutableSchema, mergeResolvers, mergeTypeDefs, } from "graphql-tools";

const loadTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadReslovers = loadFilesSync(`${__dirname}/**/*.{queries,mutations}.js`);

const typeDefs = mergeTypeDefs(loadTypes);
const resolvers = mergeResolvers(loadReslovers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;