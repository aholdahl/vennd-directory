import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

//gets details of clicked business from the database, then sends them to detailReducer
function* fetchCurrent(action) {
    try {
        let response = yield axios.get(`/api/details/${action.payload.id}`)
        yield put({
            type: 'SET_CURRENT',
            payload: response.data
        })
    } catch (error) {
        console.log(error)
    }
}

//sends details of new business from form to database (no GET route since page will change and automatically update)
function* addBusiness(action) {
    try {
        yield axios.post(`api/details`, action.payload)
        yield put({
            type: 'FETCH_BUSINESSES'
        })
    } catch (error) {
        console.log(error)
    }
}

//sends details of updated business from form to database (no GET route since page will change and automatically update)
function* updateBusiness(action) {
    try {
        yield axios.put(`api/details`, action.payload)
    } catch (error) {
        console.log(error)
    }
}

//sends details of deleted business from form to database (no GET route since page will change and automatically update)
function* deleteBusiness(action) {
    try {
        yield axios.delete(`api/details/${action.payload.id}`)
        yield put({
            type: 'FETCH_BUSINESSES'
        })
    } catch (error) {
        console.log(error)
    }
}

function* detailSaga() {
    yield takeEvery('FETCH_CURRENT', fetchCurrent);
    yield takeEvery('ADD_BUSINESS', addBusiness);
    yield takeEvery('UPDATE_BUSINESS', updateBusiness);
    yield takeEvery('DELETE_BUSINESS', deleteBusiness);
}

export default detailSaga;