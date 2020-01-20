import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

async function action({ fetch }) {
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: '{ pets { name, description, age, gender, type, age, breed, photo } }',
    }),
  });
  const { data } = await resp.json();
  if (!data || !data.pets) throw new Error('Failed to load pets.');
  return {
    title: 'Pets',
    chunks: ['home'],
    component: (
      <Layout>
        <Home pets={data.pets} />
      </Layout>
    ),
  };
};

export default action;
