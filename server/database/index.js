import mongoose from 'mongoose';

// Mandatory imports (define moongose schemas)
import {} from '../../domain'

import { database } from '../../config'

const { name, username, password, host, port } = database;

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${name}`);
