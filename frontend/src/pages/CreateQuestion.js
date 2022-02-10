import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions';
import styles from './CreateQuestion.module.css';
import InputField from '../components/InputField';
import FormHelptext from '../components/FormHelptext';
import FormButton from '../components/FormButton';

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
        const { name, value } = e.target

        setOptions({
            ...options,
            [name]: value
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
                    <InputField
                        name='optionOneText'
                        type='text'
                        value={options.optionOneText}
                        placeholder='Option one...'
                        handleChange={handleChange}
                    />
                    <div className={styles['template-text']}>OR</div>
                    <InputField
                        name='optionTwoText'
                        type='text'
                        value={options.optionTwoText}
                        placeholder='Option two...'
                        handleChange={handleChange}
                    />
                    <FormHelptext text='Both options are required to submit the question.' />
                    <FormButton
                        label='Submit'
                        handleClick={handleSubmit}
                        disabledCondition={options.optionOneText === '' || options.optionTwoText === ''}
                    />
                </div>
            </div>
        </div>
    );
}