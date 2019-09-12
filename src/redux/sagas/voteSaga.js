import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

//gets list of all available votes from the database, then sends them to voteReducer
function* fetchVotes(action) {
    try {
        let response = yield axios.get(`/api/votes/${action.payload.business_id}`)
        yield put({
            type: 'SET_VOTES',
            payload: response.data
        })
    } catch (error) {
        console.log(error)
    }
}

function* addVote(action){
    try {
        yield axios.post(`/api/votes`, action.payload)
        yield put ({
            type: 'FETCH_VOTES',
            payload: action.payload
        })
    } catch (error){
        console.log(error)
    }
}

function* updateVote(action){
    try {
        yield axios.put(`/api/votes`, action.payload)
        yield put ({
            type: 'FETCH_VOTES',
            payload: action.payload
        })
    } catch (error){
        console.log(error)
    }
}

function* voteSaga() {
    yield takeEvery('FETCH_VOTES', fetchVotes);
    yield takeEvery('ADD_VOTE', addVote);
    yield takeEvery('UPDATE_VOTE', updateVote);
}

export default voteSaga;