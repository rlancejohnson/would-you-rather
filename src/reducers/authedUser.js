import { SET_AUTHED_USER } from '../actions/authedUser';

/**
* @description Redux reducer to handle authenticated user state
* @param {string} state - the authed user state
* @param {object} action - the redux action for updating the authed user state
* @returns {string} the authed user state
*/
export default function authedUser(state = null, action) {
    switch (action.type) {
        case SET_AUTHED_USER:
            return action.id;

        default:
            return state;
    }
}

