import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import pets from './queries/pets';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      pets
    },
  }),
});

export default schema;
