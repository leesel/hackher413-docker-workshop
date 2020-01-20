import Pet  from '../models/pet';

const data = [
  { id: 1, name: 'Sassy', gender: 'female', type: 'cat', age: 6, breed: 'Siamese', status: 'adopted', description: 'blah', picture: '' },
  { id: 2, name: 'Chance', gender: 'male', type: 'dog', age: 3, breed: 'Pit Bull', status: 'adopted', description: 'blah', picture: '' },
  { id: 3, name: 'Shadow', gender: 'male', type: 'dog', age: 10, breed: 'Golden Retriever', status: 'adopted', description: 'blah', picture: '' },
  { id: 4, name: 'Luna', gender: 'female', type: 'dog', age: 12, breed: 'Corgi', status: 'adopted', description: 'blah', picture: '' }
];

const petSeeder = async () => {
  console.info("HELOOOO?");
  const count = await Pet.countDocuments().exec();
  if(count === 0){
    await Pet.insertMany(data);
  }

};

export default petSeeder;
