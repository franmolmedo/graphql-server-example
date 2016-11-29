import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import { UserSchema, UsersSchema } from './schemas/user';
import { PostSchema, PostsSchema } from './schemas/post';
import { CommentSchema, CommentsSchema } from './schemas/comment';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'This is the root query type',
  fields: () => ({
    user: UserSchema,
    users: UsersSchema,
    post: PostSchema,
    posts: PostsSchema,
    comment: CommentSchema,
    comments: CommentsSchema
  })
});

export const Schema = new GraphQLSchema({
  query: QueryType
});
