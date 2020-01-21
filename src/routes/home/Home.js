/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import useStyles from 'isomorphic-style-loader/useStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Home.css';
import PetCard from '../../components/PetCard/PetCard';

export default function Home({ pets }) {
  useStyles(s);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>Recently Adopted</h1>
        <div className={s.petContainer}>
          {pets.map(pet => (
            <PetCard pet={pet} />
          ))}
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  pets: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    }),
  ).isRequired,
};
