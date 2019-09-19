// import axios from 'axios';
// import { takeEvery, put } from 'redux-saga/effects';

// //gets list of businesses from the database that match the search input, then sends them to searchReducer
// function* fetchSearchName(action) {
//     try {
//         let response = yield axios.get(`/api/search/name/${action.payload.searchInput}`)
//         yield put({
//             type: 'SET_SEARCH',
//             payload: response.data
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }

// //gets list of businesses from the database that match the selected category, then sends them to searchReducer
// function* fetchSearchCategory(action) {
//     try {
//         let response = yield axios.get(`/api/search/category/${action.payload.selectedCategoryId}`)
//         yield put({
//             type: 'SET_SEARCH',
//             payload: response.data
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }

// //gets list of businesses from the database that where there is at least one upvote for the selected demographic, then sends them to searchReducer
// function* fetchSearchDemo(action) {
//     try {
//         let response = yield axios.get(`/api/search/demographic/${action.payload.demographic}`)
//         yield put({
//             type: 'SET_SEARCH',
//             payload: response.data
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }

// function* searchSaga() {
    // yield takeEvery('FETCH_SEARCH_NAME', fetchSearchName);
    // yield takeEvery('FETCH_SEARCH_CATEGORY', fetchSearchCategory);
    // yield takeEvery('FETCH_SEARCH_DEMOGRAPHIC', fetchSearchDemo);
// }

// export default searchSaga;

import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';

function* fetchSearch(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            params: action.payload
        };
        const response = yield axios.get('/api/search', config);
        yield put({ 
            type: 'SET_SEARCH', 
            payload: response.data 
        });
    } catch (error) {
        console.log('Search get request failed', error);
    }
}

function* searchSaga() {
    yield takeLatest('FETCH_SEARCH', fetchSearch);
}

export default searchSaga;
