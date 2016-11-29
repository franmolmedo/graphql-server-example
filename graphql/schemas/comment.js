import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql';

import { User } from './user';
import { Post } from './post';

import { CommentModel } from '../../domain';

const Comment = new GraphQLObjectType({
  name: 'Comment',
  description: 'Comment',

  fields: () => ({
    comment: { type: GraphQLString },
    id: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    modifiedAt: { type: GraphQLString },
    likes: {
      type: new GraphQLList(User),
      resolve: (comment, args, {Loaders}) => Loaders.user.loadMany(comment.likes)
    },
    author: {
      type: User,
      resolve: (comment, args, {Loaders}) => Loaders.user.load(comment.author)
    },
    post: {
      type: Post,
      resolve: (comment, args, {Loaders}) => Loaders.post.load(comment.post)
    }
  })
});

const CommentsSchema = {
  type: new GraphQLList(Comment),
  args: {
    author: { type: GraphQLString },
    post: { type: GraphQLString }
  },
  resolve: (root, args) => CommentModel.find(args, (_, values) => values)
}

const CommentSchema = {
  type: Comment,
  args: {
    id: { type: GraphQLString }
  },
  resolve: (root, args) => CommentModel.findOne(args, (_, value) => value)
}

export { Comment, CommentSchema, CommentsSchema };
