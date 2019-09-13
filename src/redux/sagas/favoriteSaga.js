import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

//gets the count of favorites that represent the user-business relationship (should always be 1), then sends to favoriteReducer
function* fetchFavorite(action) {
    try {
        let response = yield axios.get(`/api/favorites/${action.payload.business_id}`)
        yield put({
            type: 'SET_FAVORITE',
            payload: response.data
        })
    } catch (error) {
        console.log(error)
    }
}

//sends the favorited business to the server, then triggers new fetchFavorite request to update the page
function* addFavorite(action){
    try {
        yield axios.post(`/api/favorites/${action.payload.business_id}`)
        yield put ({
            type: 'FETCH_FAVORITE',
            payload: {business_id: action.payload.business_id}
        })
    } catch (error){
        console.log(error)
    }
}

//sends the unfavorited business to the server, then triggers new fetchFavorite request to update the page
function* removeFavorite(action) {
    try {
        yield axios.delete(`/api/favorites/${action.payload.business_id}`)
        yield put({
            type: 'FETCH_FAVORITE',
            payload: {business_id: action.payload.business_id}
        })
    } catch (error) {
        console.log(error)
    }
}

function* favoriteSaga() {
    // yield takeEvery ('FETCH_FAVORITES', fetchFavorites);
    yield takeEvery('FETCH_FAVORITE', fetchFavorite);
    yield takeEvery ('ADD_FAVORITE', addFavorite);
    yield takeEvery('REMOVE_FAVORITE', removeFavorite);
}

export default favoriteSaga;