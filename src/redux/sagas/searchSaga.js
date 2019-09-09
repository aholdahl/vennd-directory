import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

function* fetchDirectory(action) {
    try {
        let response = yield axios.get(`/api/search`, action.payload)
        yield put({
            type: 'SET_SEARCH',
            payload: response.data
        })
    } catch (error) {
        console.log(error)
    }
}

function* searchSaga() {
    yield takeEvery('FETCH_DIRECTORY', fetchDirectory);
}

export default searchSaga;