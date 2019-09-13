import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

//gets the count of votes per business/demographic relationship from the database, then sends them to statReducer
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