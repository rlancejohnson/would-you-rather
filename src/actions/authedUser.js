export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser(id) {
    if (id) {
        window.localStorage.setItem('authedUserId', id)
    } else {
        window.localStorage.removeItem('authedUserId')
    }

    return {
        type: SET_AUTHED_USER,
        id
    }
}