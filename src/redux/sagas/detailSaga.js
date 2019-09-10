import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

// function* updateTag(action) {
//     try {
//         yield axios.post(`/api/detail`, action.payload)
//         yield put({
//             type: 'FETCH_DIRECTORY'
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }

// function* addFavorite(action){
//     try{
//         yield axios.post(`/api/detail/${action.payload}`)
//         yield put ({
//             type: 'FETCH_DIRECTORY'
//         })
//     } catch (error){
//         console.log(error)
//     }
// }

// function* removeFavorite(action){
//     try{
//         yield axios.delete(`/api/detail/${action.payload}`)
//         yield put ({
//             type: 'FETCH_DIRECTORY'
//         })
//     } catch(error){
//         console.log(error)
//     }
// }

function* fetchCurrent(action){
    try {
        let response = yield axios.get(`/api/detail/${action.payload.id}`)
        console.log(response)
        yield put ({
            type: 'SET_CURRENT',
            payload: response.data
        })
    } catch(error){
        console.log(error)
    }
}

function* addBusiness(action){
    try {
        yield axios.post(`api/detail`, action.payload)
    } catch (error) {
        console.log(error)
    }
}

function* detailSaga() {
    // yield takeEvery('UPDATE_TAG', updateTag);
    // yield takeEvery('ADD_FAVORITE', addFavorite);
    // yield takeEvery('REMOVE_FAVORITE', removeFavorite);
    yield takeEvery('FETCH_CURRENT', fetchCurrent);
    yield takeEvery('ADD_BUSINESS', addBusiness);
}

export default detailSaga;