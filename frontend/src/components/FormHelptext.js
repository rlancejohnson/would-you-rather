import styles from './FormHelptext.module.css'

export default function FormHelptext({ text }) {
    return (
        <div className={styles['help-text']}>
            {text}
        </div>
    )
}