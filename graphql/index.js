import { Schema } from './schema';
import { UserLoader } from './schemas/dataLoaders/userLoader';
import { PostLoader } from './schemas/dataLoaders/postLoader';
import { CommentLoader } from './schemas/dataLoaders/commentLoader';

const Loaders = {
  user: UserLoader,
  post: PostLoader,
  comment: CommentLoader
}

export { Schema, Loaders }
