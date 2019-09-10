import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

function* addFavorite(action){
    try {
        yield axios.post(`/api/favorites/${action.payload.business_id}`)
    } catch (error){
        console.log(error)
    }
}

function* removeFavorite(action) {
    try {
        yield axios.delete(`/api/favorites/${action.payload.business_id}`)
    } catch (error) {
        console.log(error)
    }
}

function* favoriteSaga() {
    yield takeEvery ('ADD_FAVORITE', addFavorite);
    yield takeEvery('REMOVE_FAVORITE', removeFavorite);
}

export default favoriteSaga;