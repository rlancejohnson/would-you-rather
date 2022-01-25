import { _saveQuestion, _saveQuestionAnswer } from '../services/_DATA'
import { addUserQuestion, addUserAnswer } from './users'
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        dispatch(showLoading)

        const { authedUser } = getState();

        return _saveQuestion({ optionOneText, optionTwoText, author: authedUser })
            .then((question) => {
                dispatch(addQuestion(question))
                dispatch(addUserQuestion(question))
                dispatch(hideLoading)
            })
    }
}

function addQuestionAnswer(qid, answer) {
    return {
        type: ADD_QUESTION_ANSWER,
        qid,
        answer
    }
}

export function handleAddAnswer(qid, answer) {
    return (dispatch, getState) => {
        dispatch(showLoading)

        const { authedUser } = getState()

        return _saveQuestionAnswer({ authedUser, qid, answer })
            .then(() => {
                dispatch(addQuestionAnswer(qid, answer))
                dispatch(addUserAnswer(qid, answer))
                dispatch(hideLoading)
            })
    }
}