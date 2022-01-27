import { _saveQuestion, _saveQuestionAnswer } from '../services/_DATA';
import { addUserQuestion, addUserAnswer } from './users';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER';

/**
* @description Redux action creator for adding a question to store
* @param {object} question - the question to add to the list of questions
* @returns {object} Redux action with the type add question
*/
function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    };
}

/**
* @description Redux thunk for adding question to database
* @param {string} optionOneText - text for option one vote
* @param {string} optionTwoText - text for option two vote
* @returns {function} Redux thunk func to make async api calls
*/
export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        dispatch(showLoading);

        const { authedUser } = getState();

        return _saveQuestion({ optionOneText, optionTwoText, author: authedUser })
            .then((question) => {
                dispatch(addQuestion(question));
                dispatch(addUserQuestion(authedUser, question));
                dispatch(hideLoading);
            });
    }
}

/**
* @description Redux action creator for adding an answer to a question in store
* @param {string} authedUser - authenticated user id
* @param {string} qid - id of question the answer is for
* @param {string} answer - the answer given by the authed user for the question
* @returns {object} Redux action of type add question answer
*/
function addQuestionAnswer(authedUser, qid, answer) {
    return {
        type: ADD_QUESTION_ANSWER,
        authedUser,
        qid,
        answer
    };
}

/**
* @description Redux thunk for adding an answer to a question in database
* @param {string} qid - id of question the answer is for
* @param {string} answer - the answer given by the authed user for the question
* @returns {function} Redux thunk func to make async api calls
*/
export function handleAddAnswer(qid, answer) {
    return (dispatch, getState) => {
        dispatch(showLoading);

        const { authedUser } = getState();

        return _saveQuestionAnswer({ authedUser, qid, answer })
            .then(() => {
                dispatch(addQuestionAnswer(authedUser, qid, answer));
                dispatch(addUserAnswer(authedUser, qid, answer));
                dispatch(hideLoading);
            });
    }
}