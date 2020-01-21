import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const PetType = new ObjectType({
  name: 'Pet',
  fields: {
    id: { type: new NonNull(ID) },
    name: { type: StringType },
    gender: { type: StringType },
    type: { type: StringType },
    age: { type: IntType },
    breed: { type: StringType },
    status: { type: StringType },
    description: { type: StringType },
    picture: { type: StringType },
  },
});

export default PetType;
