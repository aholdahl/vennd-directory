import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//sends the search parameters to the search router and stores the results in the searchReducer
function* fetchSearch(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            params: action.payload
        };
        const response = yield axios.get('/api/search', config);
        yield put({
            type: 'SET_SEARCH',
            payload: response.data
        });
    } catch (error) {
        console.log('Search get request failed', error);
    }
}

function* searchSaga() {
    yield takeLatest('FETCH_SEARCH', fetchSearch);
}

export default searchSaga;
