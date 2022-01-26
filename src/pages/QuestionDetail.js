import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { handleAddAnswer } from '../actions/questions'
import { getClasses } from '../services/utils'

import styles from './QuestionDetail.module.css'
import Avatar from '../components/Avatar'

export default function QuestionDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [selectedOption, setSelectedOption] = useState(null)
    const dispatch = useDispatch()
    const { question, users } = useSelector(state => {
        return {
            question: id in state['questions'] ? state['questions'][id] : '',
            users: state.users
        }
    })

    useEffect(() => {
        if (!question) {
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
    })

    const handleSelection = (e) => {
        if (selectedOption === null) {
            const answer = e.target.id
            setSelectedOption(answer)
            dispatch(handleAddAnswer(question.id, answer))
        }
    }

    if (!question) {
        return (
            <div className={getClasses(styles, ['grid-vertical', 'grid-gap-small', 'content-area', 'title'])}>
                <div>We were unable to find your question in our filing cabinet.</div>
                <div>Please try selecting another question.</div>
            </div>
        )
    }

    return (
        <div className={getClasses(styles, ['grid-vertical'])}>
            <div className={getClasses(styles, ['grid', 'grid-gap-small', 'content-area', 'title'])}>
                <Avatar
                    url={users[question.author].avatarURL}
                    diameter={50}
                />
                <span>{`${users[question.author].name} asks:`}</span>
            </div>
            <div className={getClasses(styles, ['grid-vertical', 'content-area', 'form'])}>
                <div className={getClasses(styles, ['template-text'])}>
                    Would you rather...
                </div>
                <div className={getClasses(styles, ['grid', 'grid-gap-large'])}>
                    <div className={getClasses(styles, ['grid-vertical'])}>
                        <div
                            id='optionOne'
                            className={getClasses(styles, selectedOption && selectedOption === 'optionOne' ? ['option-btn-selected'] : selectedOption ? ['option-btn-disabled'] : ['option-btn'])}
                            onClick={handleSelection}>
                            {question.optionOne.text}
                        </div>
                        {selectedOption &&
                            <div className={getClasses(styles, ['stats-badge', 'grid-vertical'])}>
                                <div>{`${question.optionOne.votes.length} Friends Chose`}</div>
                                <div>{`${parseInt((question.optionOne.votes.length / Object.keys(users).length) * 100)}%`}</div>
                            </div>
                        }
                    </div>
                    <div className={getClasses(styles, ['template-text'])}>
                        OR
                    </div>
                    <div className={getClasses(styles, ['grid-vertical'])}>
                        <div
                            id='optionTwo'
                            className={getClasses(styles, selectedOption && selectedOption === 'optionTwo' ? ['option-btn-selected'] : selectedOption ? ['option-btn-disabled'] : ['option-btn'])}
                            onClick={handleSelection}>
                            {question.optionTwo.text}
                        </div>
                        {selectedOption &&
                            <div className={getClasses(styles, ['stats-badge', 'grid-vertical'])}>
                                <div>{`${question.optionTwo.votes.length} Friends Chose`}</div>
                                <div>{`${parseInt((question.optionTwo.votes.length / Object.keys(users).length) * 100)}%`}</div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}