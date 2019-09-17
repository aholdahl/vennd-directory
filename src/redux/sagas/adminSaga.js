import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchUserList() {
    try {
        let response = yield axios.get('/api/admin')
        console.log(response)
        yield put({
            type: 'SET_USER_LIST',
            payload: response.data
        })
    } catch (error) {
        console.log(error)
    }
}

function* deleteUser(action) {
    try {
        yield axios.delete(`/api/admin/${action.payload.id}`)
        yield put({
            type: 'FETCH_USER_LIST'
        })
    } catch (error) {
        console.log(error)
    }
}

function* updateUser(action) {
    try {
        yield axios.put(`api/admin`, action.payload)
        yield put({
            type: 'FETCH_USER_LIST'
        })
    } catch (error) {
        console.log(error)
    }
}

function* adminSaga() {
    yield takeEvery('FETCH_USER_LIST', fetchUserList);
    yield takeEvery('DELETE_USER', deleteUser);
    yield takeEvery('UPDATE_USER', updateUser);
}

export default adminSaga;