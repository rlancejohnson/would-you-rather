import { SET_INITIAL_DATA } from '../actions/shared'
import { ADD_USER_QUESTION, ADD_USER_ANSWER } from '../actions/users'

export default function users(state = {}, action) {
    switch (action.type) {
        case SET_INITIAL_DATA:
            return {
                ...state,
                ...action.users
            }

        case ADD_USER_QUESTION:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    questions: state[action.authedUser].questions.concat([action.question.id])
                }
            }

        case ADD_USER_ANSWER:
            return {
                ...state,
                [action.authedUser]: {
                    ...users[action.authedUser],
                    answers: {
                        ...users[action.authedUser].answers,
                        [action.qid]: action.answer
                    }
                }
            }

        default:
            return state
    }
}