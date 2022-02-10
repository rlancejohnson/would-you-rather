import styles from './InputField.module.css'

export default function InputField({ name, type, placeholder, value, handleChange }) {
    return (
        <input
            name={name}
            type={type}
            className={styles['input-field']}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
        />
    )
}