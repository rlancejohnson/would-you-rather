export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER';

/**
* @description Redux action creator for adding new question to user
* @param {string} authedUser - the id of the authenticated user
* @param {string} question - the question to add to user
* @returns {object} Redux action of type add user question
*/
export function addUserQuestion(authedUser, question) {
    return {
        type: ADD_USER_QUESTION,
        authedUser,
        question
    };
}

/**
* @description Redux action creator for adding new answer to user
* @param {string} authedUser - the id of the authenticated user
* @param {string} qid - the id of the question the answer is related to
* @param {string} answer - the answer to the question for the autheed user
* @returns {object} Redux action of the type add user answer
*/
export function addUserAnswer(authedUser, qid, answer) {
    return {
        type: ADD_USER_ANSWER,
        authedUser,
        qid,
        answer
    };
}