import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

//gets list of all available votes from the database, then sends them to voteReducer
function* fetchVotes(action) {
    try {
        let response = yield axios.get(`/api/votes`)
        yield put({
            type: 'SET_VOTES',
            payload: response.data
        })
    } catch (error) {
        console.log(error)
    }
}

function* voteSaga() {
    yield takeEvery('FETCH_VOTES', fetchVotes);
}

export default voteSaga;