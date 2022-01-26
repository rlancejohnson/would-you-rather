import { _getUsers, _getQuestions } from '../services/_DATA';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const SET_INITIAL_DATA = 'SET_INITIAL_DATA';

function setInitialData(users, questions) {
    return {
        type: SET_INITIAL_DATA,
        users,
        questions
    };
}

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