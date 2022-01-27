import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions';
import styles from './CreateQuestion.module.css';

/**
* @description Component for the create question page
* @constructor
*/
export default function CreateQuestion() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [options, setOptions] = useState({
        optionOneText: '',
        optionTwoText: ''
    });

    const handleChange = (e) => {
        setOptions({
            ...options,
            [e.target.id]: e.target.value
        });
    }

    const handleSubmit = () => {
        const { optionOneText, optionTwoText } = options;
        dispatch(handleAddQuestion(optionOneText, optionTwoText));
        setOptions({
            optionOneText: '',
            optionTwoText: ''
        });
        navigate('/');
    }

    return (
        <div className={styles['layout']}>
            <div className={`${styles['section']} ${styles['title']}`}>
                Create New Question
            </div>
            <div className={`${styles['section']} ${styles['form']}`}>
                <div className={styles['layout']}>
                    <div className={`${styles['question-header']} ${styles['template-text']}`}>
                        Would you rather...
                    </div>
                    <input
                        id='optionOneText'
                        type='text'
                        className={styles['option-input']}
                        value={options.optionOneText}
                        onChange={handleChange}
                        required
                    />
                    <div className={styles['template-text']}>OR</div>
                    <input
                        id='optionTwoText'
                        type='text'
                        className={styles['option-input']}
                        value={options.optionTwoText}
                        onChange={handleChange}
                        required
                    />
                    <div className={styles['help-text']}>
                        Both options are required to submit the question.
                    </div>
                    <button
                        className={options.optionOneText === '' || options.optionTwoText === '' ? styles['submit-btn-disabled'] : styles['submit-btn']}
                        disabled={options.optionOneText === '' || options.optionTwoText === ''}
                        title='Both options must be filled out to submit.'
                        onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}