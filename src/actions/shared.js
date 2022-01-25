import { _getUsers, _getQuestions } from '../services/_DATA'

export const SET_DATA = 'SET_DATA'

function setData(users, questions) {
    return {
        type: SET_DATA,
        users,
        questions
    }
}

export function handleSetData() {
    return (dispatch) => {
        return Promise.all([
            _getUsers(),
            _getQuestions()
        ])
            .then(([users, questions]) => {
                dispatch(setData(users, questions))
            })
    }
}