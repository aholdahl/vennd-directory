import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

//gets list of businesses from the database that match the search parameters, then sends them to searchReducer
function* fetchSearch(action) {
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
    yield takeEvery('FETCH_SEARCH', fetchSearch);
}

export default searchSaga;