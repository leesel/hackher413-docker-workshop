import Pet from '../models/pet';

const data = [
  {
    id: 1,
    name: 'Sassy',
    gender: 'female',
    type: 'cat',
    age: 6,
    breed: 'Siamese',
    status: 'adopted',
    description:
      'Named appropriately, this cat has sass! Sassy will enjoys sitting on keyboards.',
    picture: '/sassy.jpg',
  },
  {
    id: 2,
    name: 'Chance',
    gender: 'male',
    type: 'dog',
    age: 3,
    breed: 'American Bulldog',
    status: 'adopted',
    description: 'Chance loves to play fetch and is extremely friendly.',
    picture: '/chance.jpg',
  },
  {
    id: 3,
    name: 'Shadow',
    gender: 'male',
    type: 'dog',
    age: 10,
    breed: 'Golden Retriever',
    status: 'adopted',
    description:
      'Noble and majestic, Shadow might be the loyal companion for you!',
    picture: '/shadow.jpg',
  },
  {
    id: 4,
    name: 'Luna',
    gender: 'female',
    type: 'dog',
    age: 12,
    breed: 'Corgi Mix',
    status: 'adopted',
    description: 'This cute cuddle bug will sit by your side for hours!',
    picture: '/luna.jpg',
  },
  {
    id: 5,
    name: 'Ziggy',
    gender: 'male',
    type: 'dog',
    age: 1,
    breed: 'Catahoula Leopard Mix',
    status: 'adopted',
    description:
      'Ziggy is a playful, derpy puppy who absolutely loves the snow.',
    picture: '/ziggy.jpg',
  },
  {
    id: 6,
    name: 'Kelly',
    gender: 'female',
    type: 'dog',
    age: 4,
    breed: 'Boxer',
    status: 'adopted',
    description:
      'Kelly is definitely a family dog! She loves being with people.',
    picture: '/kelly.jpg',
  },
];

const petSeeder = async () => {
  await Pet.remove({});
  await Pet.insertMany(data);
};

export default petSeeder;
