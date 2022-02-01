import { _getUsers, _getQuestions } from '../services/_DATA';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const SET_INITIAL_DATA = 'SET_INITIAL_DATA';

/**
* @description Redux action creator for setting initial users and questions in store
* @param {object} users - all users from database
* @param {object} quesitons - all questions from database
* @returns {object} Redux action of type set initial data
*/
function setInitialData(users, questions) {
    return {
        type: SET_INITIAL_DATA,
        users,
        questions
    };
}

/**
* @description Redux thunk for getting initial users and questions
* @returns {function} Redux thunk func for making async api calls
*/
export function handleSetInitialData() {
    return (dispatch) => {
        dispatch(showLoading());

        return Promise.all([
            _getUsers(),
            _getQuestions()
        ])
            .then(([users, questions]) => {
                dispatch(setInitialData(users, questions));
                dispatch(hideLoading());
            });
    }
}