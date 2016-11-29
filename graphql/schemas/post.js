import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql';

import { User } from './user';
import { Comment } from './comment';

import { PostModel } from '../../domain';

const Post = new GraphQLObjectType({
  name: 'Post',
  description: 'Each content of the blog',

  fields: () => ({
    title: { type: GraphQLString },
    content : { type: GraphQLString },
    category : { type: GraphQLString },
    id: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    modifiedAt: { type: GraphQLString },
    comments: {
      type: new GraphQLList(Comment),
      resolve: (post, args, {Loaders}) => Loaders.comment.loadMany(post.comments)
    },
    author: {
      type: User,
      resolve: (post, args, {Loaders}) => Loaders.user.load(post.author)
    }
  })
});

const PostsSchema = {
  type: new GraphQLList(Post),
  args: {
    id: { type: GraphQLString },
    category: { type: GraphQLString}
  },
  resolve: (root, args) => PostModel.find(args, (_, values) => values)
}

const PostSchema = {
  type: Post,
  args: {
    id: { type: GraphQLString }
  },
  resolve: (root, args) => PostModel.findOne(args, (_, value) => value)
}

export { Post, PostSchema, PostsSchema };
