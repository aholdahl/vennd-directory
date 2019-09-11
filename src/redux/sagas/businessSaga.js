import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

//gets list of all available businesses from the database, then sends them to businessReducer
function* fetchBusinesses(action) {
    try {
        let response = yield axios.get(`/api/businesses`)
        yield put({
            type: 'SET_BUSINESSES',
            payload: response.data
        })
    } catch (error) {
        console.log(error)
    }
}

function* businessSaga() {
    yield takeEvery('FETCH_BUSINESSES', fetchBusinesses);
}

export default businessSaga;