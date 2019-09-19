const favoriteReducer = (state = {array_agg: []}, action) => {
    switch (action.type) {
        case 'SET_FAVORITE':
            return action.payload[0];
        default:
            return state;
    }
}

export default favoriteReducer;