export const ADD_USER_QUESTION = 'ADD_USER_QUESTION'
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER'

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