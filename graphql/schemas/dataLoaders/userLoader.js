import DataLoader from 'dataloader';

import { UserModel } from '../../../domain';

const getUsersById = keys =>
  UserModel.find({'_id': { $in: keys }}, (_, values) => values);

const UserLoader = new DataLoader(
  keys => getUsersById(keys).then(values =>
    keys.map(key =>
      values.find(elem => elem._id.toString() === key.toString())
    ))
);

export { UserLoader }
