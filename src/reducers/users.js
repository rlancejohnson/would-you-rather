import { SET_INITIAL_DATA } from '../actions/shared';
import { ADD_USER_QUESTION, ADD_USER_ANSWER } from '../actions/users';

/**
* @description Redux reducer to handle users state
* @param {object} state - the users state
* @param {object} action - the redux action for updating the users state
* @returns {string} the users state
*/
export default function users(state = {}, action) {
    switch (action.type) {
        case SET_INITIAL_DATA:
            return {
                ...state,
                ...action.users
            };

        case ADD_USER_QUESTION:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    questions: state[action.authedUser].questions.concat([action.question.id])
                }
            };

        case ADD_USER_ANSWER:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.qid]: action.answer
                    }
                }
            };

        default:
            return state;
    }
}