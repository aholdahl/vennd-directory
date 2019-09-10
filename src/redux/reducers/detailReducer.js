const detailReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CURRENT':
            return action.payload[0];
        default:
            return state;
    }
}

export default detailReducer;