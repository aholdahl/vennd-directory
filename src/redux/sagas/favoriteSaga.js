import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

function* fetchFavorites (action) {
    try {
        let response = yield axios.get(`/api/favorites`)
        yield put({
            type: 'SET_FAVORITES',
            payload: response.data
        })
    } catch (error) {
        console.log(error)
    }
}

function* fetchSaga() {
    yield takeEvery('FETCH_FAVORITES', fetchFavorites);
}

export default fetchSaga;