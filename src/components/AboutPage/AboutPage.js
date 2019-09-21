import React from 'react';
import { Paper, Typography } from '@material-ui/core';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <Paper className="pageBody">
    <Typography className="detailCard">
      Vennd is a diversity and inclusion directory designed to allow folks to search, save, and rate businesses based on their demographics.
      Our hope is that someday diversity and inclusion will be the norm.
      Until then, Vennd's goal is for diverse people to find safe and welcoming spaces to spend their time and money.
      Anyone can use the Vennd search page. Only registered users will be able to add, favorite, or rate businesses.
      Rest assured, your data will only be used to provide anonymous statistics on this site.
      Personal information will never be shared with a third party.
      Happy browsing!
  </Typography>
  </Paper>
);

export default AboutPage;
