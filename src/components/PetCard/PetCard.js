import useStyles from 'isomorphic-style-loader/useStyles';
import React from 'react';
import s from './PetCard.css';

export default function PetCard({ pet }) {
  useStyles(s);
  return (
    <div className={s.root}>
      <img src={pet.picture} />
      <div className={s.petName}>
        <h3>{pet.name}</h3>
        {pet.type === 'cat' && <i className="fas fa-cat" />}
        {pet.type === 'dog' && <i className="fas fa-dog" />}
        {pet.gender === 'male' && <i className="fas fa-mars" />}
        {pet.gender === 'female' && <i className="fas fa-venus" />}
      </div>
      <p>Breed: {pet.breed}</p>
      <p>Age: {pet.age}</p>
      <p>{pet.description}</p>
    </div>
  );
}
