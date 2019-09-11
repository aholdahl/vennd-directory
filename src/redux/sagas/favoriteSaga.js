import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

function* fetchFavorite(action) {
    try {
        let response = yield axios.get(`/api/favorite/${action.payload.business_id}`)
        yield put({
            type: 'SET_FAVORITE',
            payload: response.data
        })
    } catch (error) {
        console.log(error)
    }
}

function* addFavorite(action){
    try {
        yield axios.post(`/api/favorite/${action.payload.business_id}`)
        yield put ({
            type: 'FETCH_FAVORITE',
            payload: {business_id: action.payload.business_id}
        })
    } catch (error){
        console.log(error)
    }
}

function* removeFavorite(action) {
    try {
        yield axios.delete(`/api/favorite/${action.payload.business_id}`)
        yield put({
            type: 'FETCH_FAVORITE',
            payload: {business_id: action.payload.business_id}
        })
    } catch (error) {
        console.log(error)
    }
}


function* favoriteSaga() {
    yield takeEvery('FETCH_FAVORITE', fetchFavorite);
    yield takeEvery ('ADD_FAVORITE', addFavorite);
    yield takeEvery('REMOVE_FAVORITE', removeFavorite);
}

export default favoriteSaga;