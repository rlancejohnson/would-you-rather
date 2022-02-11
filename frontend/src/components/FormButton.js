import styles from './FormButton.module.css'

export default function FormButton({ label, color, disabledCondition, handleClick }) {
    return (
        <button
            className={disabledCondition ? styles['btn-disabled'] : styles['btn']}
            style={{ backgroundColor: color }}
            disabled={disabledCondition}
            onClick={handleClick}>
            {label}
        </button>
    )
}