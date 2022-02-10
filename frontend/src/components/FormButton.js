import styles from './FormButton.module.css'

export default function FormButton({ label, disabledCondition, handleClick }) {
    return (
        <button
            className={disabledCondition ? styles['btn-disabled'] : styles['btn']}
            disabled={disabledCondition}
            onClick={handleClick}>
            {label}
        </button>
    )
}