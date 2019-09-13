import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import businessSaga from './businessSaga';
import categorySaga from './categorySaga';
import demographicSaga from './demographicSaga';
import detailSaga from './detailSaga';
import favoriteSaga from './favoriteSaga';
import ratingSaga from './ratingSaga';
import searchSaga from './searchSaga';
import statSaga from './statSaga';
import voteSaga from './voteSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    businessSaga(),
    categorySaga(),
    demographicSaga(),
    detailSaga(),
    favoriteSaga(),
    ratingSaga(),
    searchSaga(),
    statSaga(),
    voteSaga(),
  ]);
}
