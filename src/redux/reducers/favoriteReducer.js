const favoriteReducer = (state = 0, action) => {
    switch (action.type) {
        case 'SET_FAVORITE':
            return Number(action.payload[0].count);
        default:
            return state;
    }
}

export default favoriteReducer;