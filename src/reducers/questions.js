import { SET_INITIAL_DATA } from '../actions/shared'
import { ADD_QUESTION, ADD_QUESTION_ANSWER } from '../actions/questions'

export default function questions(state = {}, action) {
    switch (action.type) {
        case SET_INITIAL_DATA:
            return {
                ...state,
                ...action.questions
            }

        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            }

        case ADD_QUESTION_ANSWER:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: state[action.qid][action.answer].votes.concat([action.authedUser])
                    }
                }
            }

        default:
            return state
    }
}