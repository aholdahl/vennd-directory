const demographicReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_DEMOGRAPHICS':
            return action.payload;
        default:
            return state;
    }
}

export default demographicReducer;