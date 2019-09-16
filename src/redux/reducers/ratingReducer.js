const ratingReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_RATING':
            if(action.payload.length >0){
                return action.payload[0];
            } else {
                return {user_rating: undefined}
            }
        default:
            return state;
    }
}

export default ratingReducer;