import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { handleAddAnswer } from '../actions/questions'
import { getClasses } from '../services/utils'

import styles from './QuestionDetail.module.css'
import Avatar from '../components/Avatar'

export default function QuestionDetail() {
    const { id } = useParams()
    const [selectedOption, setSelectedOption] = useState(null)
    const dispatch = useDispatch()
    const { question, users } = useSelector(state => {
        return {
            question: state['questions'][id],
            users: state.users
        }
    })

    const handleSelection = (e) => {
        if (selectedOption === null) {
            const answer = e.target.id
            setSelectedOption(answer)
            dispatch(handleAddAnswer(question.id, answer))
        }
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
                    <div
                        id='optionOne'
                        className={getClasses(styles, selectedOption && selectedOption === 'optionOne' ? ['option-btn-selected'] : selectedOption ? ['option-btn-disabled'] : ['option-btn'])}
                        onClick={handleSelection}>
                        {question.optionOne.text}
                    </div>
                    <div className={getClasses(styles, ['template-text'])}>
                        OR
                    </div>
                    <div
                        id='optionTwo'
                        className={getClasses(styles, selectedOption && selectedOption === 'optionTwo' ? ['option-btn-selected'] : selectedOption ? ['option-btn-disabled'] : ['option-btn'])}
                        onClick={handleSelection}>
                        {question.optionTwo.text}
                    </div>
                </div>
            </div>
        </div >
    )
}