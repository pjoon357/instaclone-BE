import { loadFilesSync, mergeResolvers, mergeTypeDefs, } from "graphql-tools";

const loadTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadReslovers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);

export const typeDefs = mergeTypeDefs(loadTypes);
export const resolvers = mergeResolvers(loadReslovers);