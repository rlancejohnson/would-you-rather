import { getClasses } from '../services/utils'
import styles from 'Tab.module.css'

export default function Tab({ label, color, activeTab, setActiveTab }) {
    return (
        <div
            className={getClasses(styles, activeTab === 1 ? ['tab', 'active-tab'] : ['tab'])}
            onClick={() => setActiveTab(label)}>
            {label}
        </div>
    )
}