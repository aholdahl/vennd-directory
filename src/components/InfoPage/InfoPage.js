import React from 'react';
import { Paper, Typography, List, ListItem } from '@material-ui/core';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const InfoPage = () => (
  <Paper className="pageBody">
    <Typography className="detailCard">
      Welcome to Vennd! Here are some things to keep in mind while using this site:
    </Typography>
    <List component="ul">
      <ListItem>The search input field will only search by business name. You must use the category dropdown or widgets to filter results by other parameters. Unfortunately, you can currently only search by one parameter at a time.</ListItem>
      <ListItem>A checkmark icon indicates that the business listing has been reviewed and approved by the administrator.</ListItem>
      <ListItem>A caution icon indicates that the administrator has been informed of a complaint against this business. Currently there are no resources to substantiate these claims.</ListItem>
      <ListItem>Users may save businesses to their favorites.</ListItem>
      <ListItem>Users should only add new businesses with a "brick-and-mortar" storefront and that are not already existing in the directory.</ListItem>
      <ListItem>Users should only vote on businesses based on the demographics they represent.</ListItem>
    </List>
  </Paper>
);

export default InfoPage;
