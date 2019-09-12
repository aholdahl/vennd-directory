import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import businessReducer from './businessReducer';
import categoryReducer from './categoryReducer';
import demographicReducer from './demographicReducer';
import detailReducer from './detailReducer';
import favoriteReducer from './favoriteReducer';
import ratingReducer from './ratingReducer';
import searchReducer from './searchReducer';
import voteReducer from './voteReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  businessReducer,
  categoryReducer,
  demographicReducer,
  detailReducer,
  favoriteReducer,
  ratingReducer,
  searchReducer,
  voteReducer,
});

export default rootReducer;
