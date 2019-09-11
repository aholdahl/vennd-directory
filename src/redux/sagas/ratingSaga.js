
import axios from 'axios';
import { takeEvery, takeLatest, put } from 'redux-saga/effects';

//gets the rating for the current user-business relationship, then sends to ratingReducer
function* fetchRatings(action) {
    try {
        let response = yield axios.get(`/api/ratings`)
        yield put({
            type: 'SET_RATINGS',
            payload: response.data
        })
    } catch (error) {
        console.log(error)
    }
}

// //sends the new business rating to the server, then triggers new fetchRating request to update the page
// function* addRating(action) {
//     console.log(action.payload)
//     try {
//         yield axios.post(`/api/rating`, action.payload)
//         yield put({
//             type: 'FETCH_RATING',
//             payload: { business_id: action.payload.business_id }
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }

// //sends the updated business rating to the server, then triggers new fetchRating request to update the page
// function* updateRating(action) {
//     try {
//         yield axios.put(`/api/rating/${action.payload.business_id}`, action.payload.rating)
//         yield put({
//             type: 'FETCH_RATING',
//             payload: { business_id: action.payload.business_id }
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }

function* ratingSaga() {
    yield takeEvery('FETCH_RATINGS', fetchRatings);
//     yield takeLatest('ADD_RATING', addRating);
//     yield takeEvery('UPDATE_RATING', updateRating);
}

export default ratingSaga;