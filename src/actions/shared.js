import { _getUsers, _getQuestions } from '../services/_DATA'

export const SET_INITIAL_DATA = 'SET_INITIAL_DATA'

function setInitialData(users, questions) {
    return {
        type: SET_INITIAL_DATA,
        users,
        questions
    }
}

export function handleSetInitialData() {
    return (dispatch) => {
        return Promise.all([
            _getUsers(),
            _getQuestions()
        ])
            .then(([users, questions]) => {
                dispatch(setInitialData(users, questions))
            })
    }
}