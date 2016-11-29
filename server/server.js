import express from 'express';
import graphQLHTTP from 'express-graphql';

import { server } from '../config';
import { Schema, Loaders } from '../graphql';

import {} from './database';

const app = express();

app.use(graphQLHTTP({
  context: {Loaders},
  schema: Schema,
  graphiql: true
}));

app.listen(server.port, () => { console.log(`App listen on ${server.port}`) });
