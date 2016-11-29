import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql';

import { Post } from './post';
import { Comment } from './comment';

import { UserModel} from '../../domain'

const User = new GraphQLObjectType({
  name: 'User',
  description: 'General user of the app',

  fields: () => ({
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    id: { type: GraphQLString },
    contacts: {
      type: new GraphQLList(User),
      resolve: (user, args, {Loaders}) => Loaders.user.loadMany(user.contacts)
    },
    posts: {
      type: new GraphQLList(Post),
      resolve: (user, args, {Loaders}) => Loaders.post.loadMany(user.posts)
    },
    comments: {
      type: new GraphQLList(Comment),
      resolve: (user, args, {Loaders}) => Loaders.comment.loadMany(user.comments)
    }
  })
});

const UsersSchema = {
  type: new GraphQLList(User),
  args: {
    firstName: { type: GraphQLString },
    lastName:{ type: GraphQLString }
  },
  resolve: (root, args) => UserModel.find(args, (_, values) => values)
}

const UserSchema = {
  type: User,
  args: {
    id: { type: GraphQLString },
    email:{ type: GraphQLString }
  },
  resolve: (root, args) => UserModel.findOne(args, (_, value) => value)
}

export { User, UserSchema, UsersSchema };
