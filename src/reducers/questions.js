import { SET_DATA } from '../actions/shared'
import { ADD_QUESTION, ADD_QUESTION_ANSWER } from '../actions/questions'

export function questions(state = {}, action) {
    switch (action.type) {
        case SET_DATA:
            const { questions } = action

            return {
                ...state,
                questions
            }

        case ADD_QUESTION:
            const { question } = action

            return {
                ...state,
                questions: {
                    ...state['questions'],
                    question
                }
            }

        case ADD_QUESTION_ANSWER:
            const { authedUser } = state
            const { qid, answer } = action

            return {
                ...state,
                questions: {
                    ...state['questions'],
                    [qid]: {
                        ...questions[qid],
                        [answer]: {
                            ...questions[qid][answer],
                            votes: questions[qid][answer].votes.concat([authedUser])
                        }
                    }
                }
            }

        default:
            return state
    }
}