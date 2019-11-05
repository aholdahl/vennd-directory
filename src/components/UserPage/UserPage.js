import React from 'react';
import { connect } from 'react-redux';
import { Container, Typography } from '@material-ui/core';
import LogOutButton from '../LogOutButton/LogOutButton';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
const UserPage = (props) => (
  <Container className="pageBody">
    <Typography variant="h4" id="welcome" className="detailCard">
      Welcome, {props.user.username}!
    </Typography>
    <Typography>Your ID is: {props.user.id}</Typography>
    <Typography>This is the beta release of Vennd. We will be conducting user experience testing and collecting data to determine the scope of enhancements for version 2.0.</Typography>
    <LogOutButton className="log-in" />
  </Container>
);

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
