export const SET_USERS = 'SET_USERS'
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION'
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER'

export function setUsers(users) {
    return {
        type: SET_USERS,
        users
    }
}

export function addUserQuestion(question) {
    return {
        type: ADD_USER_QUESTION,
        question
    }
}

export function addUserAnswer(qid, answer) {
    return {
        type: ADD_USER_ANSWER,
        qid,
        answer
    }
}