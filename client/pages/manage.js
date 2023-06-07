import React from 'react';

import {
  Container,
  Navigation,
  Datasets,
  Tokens,
} from '../components';

export default function Home() {
  return (
    <div>
      <Container>
        <Navigation />
      </Container>
      <Container>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Manage
          <span className="text-sky-700">
            {' '}
            your data
            {' '}
          </span>
        </h1>
        <Datasets />
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
          Access
          <span className="text-sky-700">
            {' '}
            tokens
            {' '}
          </span>
        </h2>
        <Tokens />
      </Container>
    </div>
  );
}
