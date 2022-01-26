export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER';

export function addUserQuestion(authedUser, question) {
    return {
        type: ADD_USER_QUESTION,
        authedUser,
        question
    };
}

export function addUserAnswer(authedUser, qid, answer) {
    return {
        type: ADD_USER_ANSWER,
        authedUser,
        qid,
        answer
    };
}