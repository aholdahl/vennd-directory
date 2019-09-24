import ratingReducer from './ratingReducer.js';

describe('Testing ratingReducer states', ()=>{
    test('Should have its correct initial state', ()=>{
        let action = {};
        let newState = ratingReducer(undefined, action)
        expect(newState).toEqual({})
    })
    test('Should set state per the payload', ()=>{
        let action = { 
            type: 'SET_RATING',
            payload: [{user_rating: 5}]
        }
        let newState = ratingReducer({}, action)
        expect(newState).toEqual({ user_rating: 5 })
    })
    test('Should set state of user_rating: undefined', ()=>{
        let action = {
            type: 'SET_RATING',
            payload: []
        }
        let newState = ratingReducer({user_rating: 5}, action)
        expect(newState).toEqual({user_rating: undefined})
    })
})