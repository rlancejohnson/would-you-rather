export const SET_AUTHED_USER = 'SET_AUTHED_USER';

/**
* @description Redux action creator for setting the authed user
* @param {string} id - the id of the user to authenticate
* @returns {object} redux action with the set authed user type
*/
export function setAuthedUser(id) {
    if (id) {
        window.localStorage.setItem('authedUserId', id);

    } else {
        window.localStorage.removeItem('authedUserId');
    }

    return {
        type: SET_AUTHED_USER,
        id
    };
}