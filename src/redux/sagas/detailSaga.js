import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

//gets details of clicked business from the database, then sends them to detailReducer
function* fetchCurrent(action){
    try {
        let response = yield axios.get(`/api/detail/${action.payload.id}`)
        yield put ({
            type: 'SET_CURRENT',
            payload: response.data
        })
    } catch(error){
        console.log(error)
    }
}

//sends details of new business from form to database (no GET route since page will change and automatically update)
function* addBusiness(action){
    try {
        yield axios.post(`api/detail`, action.payload)
    } catch (error) {
        console.log(error)
    }
}

function* detailSaga() {
    yield takeEvery('FETCH_CURRENT', fetchCurrent);
    yield takeEvery('ADD_BUSINESS', addBusiness);
}

export default detailSaga;