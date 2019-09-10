import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <div>
      <p>
        Vennd is a diversity and inclusion directory designed for folks to speak for themselves and support businesses that support their identity.
      </p>
    </div>
  </div>
);

export default AboutPage;
