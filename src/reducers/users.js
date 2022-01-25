import { SET_USERS, ADD_USER_QUESTION, ADD_USER_ANSWER } from '../actions/users'

export function users(state = {}, action) {
    switch (action.type) {
        case SET_USERS:
            const { users } = action

            return {
                ...state,
                users
            }

        case ADD_USER_QUESTION:
            const { authedUser } = state
            const { question } = action

            return {
                ...state,
                users: {
                    ...state['users'],
                    [authedUser]: {
                        ...state['users'][authedUser],
                        questions: state['users'][authedUser].questions.concat([question.id])
                    }
                }
            }

        case ADD_USER_ANSWER:
            const { authedUserId } = state
            const { qid, answer } = action

            return {
                ...state,
                users: {
                    ...state['users'],
                    [authedUserId]: {
                        ...users[authedUserId],
                        answers: {
                            ...users[authedUserId].answers,
                            [qid]: answer
                        }
                    }
                }
            }

        default:
            return state
    }
}