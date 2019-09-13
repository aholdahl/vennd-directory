import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

function* fetchStats(action) {
    try {
        let response = yield axios.get(`/api/stats/${action.payload.business_id}`)
        yield put({
            type: 'SET_STATS',
            payload: response.data
        })
    } catch (error) {
        console.log(error)
    }
}

function* statSaga() {
    yield takeEvery('FETCH_STATS', fetchStats);
}

export default statSaga;