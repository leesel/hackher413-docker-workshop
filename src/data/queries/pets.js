import PetType from '../types/PetType';
import {GraphQLList} from "graphql";
import Pet from '../models/pet';

const pets = {
  type: new GraphQLList(PetType),
  resolve() {
    return Pet.find({});
  }
};

export default pets;
