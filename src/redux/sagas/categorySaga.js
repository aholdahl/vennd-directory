import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

function* fetchCategories(action) {
    try {
        let response = yield axios.get(`/api/categories`)
        yield put({
            type: 'SET_CATEGORIES',
            payload: response.data
        })
    } catch (error) {
        console.log(error)
    }
}

function* searchSaga() {
    yield takeEvery('FETCH_CATEGORIES', fetchCategories);
}

export default searchSaga;