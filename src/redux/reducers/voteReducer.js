const voteReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_VOTES':
            return action.payload;
        default:
            return state;
    }
}

export default voteReducer;