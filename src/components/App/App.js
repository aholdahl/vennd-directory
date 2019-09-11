import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';

import SearchPage from '../SearchPage/SearchPage';
import DetailPage from '../DetailPage/DetailPage';
import BusinessForm from '../BusinessForm/BusinessForm';

import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
    this.fetchBusinesses();
    this.fetchCategories();
    this.fetchDemographics();
    this.fetchFavorites();
    this.fetchRatings();
    this.fetchVotes();
  }

  //saves the list of available categories via categorySaga to a reducer for use in the search parameters dropdown menu
  fetchCategories = () => {
    this.props.dispatch({
      type: 'FETCH_CATEGORIES'
    })
  }

  //retrieves the search results via searchSaga from the database based on the specified parameters
  fetchBusinesses = () => {
    this.props.dispatch({
      type: 'FETCH_BUSINESSES'
    })
  }

  fetchDemographics = ()=>{
    this.props.dispatch({
      type: 'FETCH_DEMOGRAPHICS'
    })
  }

  fetchFavorites = ()=>{
    this.props.dispatch({
      type: 'FETCH_FAVORITES'
    })
  }

  fetchRatings = ()=>{
    this.props.dispatch({
      type: 'FETCH_RATINGS'
    })
  }
  
  fetchVotes = ()=>{
    this.props.dispatch({
      type: 'FETCH_VOTES'
    })
  }


  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            <Route
              exact
              path="/detail"
              component={DetailPage}
            />
            <Route
              exact
              path="/new"
              component={BusinessForm}
            />
            <Route
              exact
              path="/search"
              component={SearchPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
