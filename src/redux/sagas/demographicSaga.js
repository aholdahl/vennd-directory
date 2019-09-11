import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

//gets list of all available demographics from the database, then sends them to demographicReducer
function* fetchDemographics(action) {
    try {
        let response = yield axios.get(`/api/demographics`)
        yield put({
            type: 'SET_DEMOGRAPHICS',
            payload: response.data
        })
    } catch (error) {
        console.log(error)
    }
}

function* demographicSaga() {
    yield takeEvery('FETCH_DEMOGRAPHICS', fetchDemographics);
}

export default demographicSaga;