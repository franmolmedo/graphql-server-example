import DataLoader from 'dataloader';

import { PostModel } from '../../../domain';

const getPostsById = keys =>
  PostModel.find({'_id': { $in: keys }}, (_, values) => values);

const PostLoader = new DataLoader(
  keys => getPostsById(keys).then(values =>
    keys.map(key =>
      values.find(elem => elem._id.toString() === key.toString())
    ))
);

export { PostLoader }
