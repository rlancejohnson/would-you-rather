import { useState, useEffect } from 'react'
import { getClasses } from '../services/utils'
import styles from './Tabs.module.css'

export default function Tabs({ defaultTab, children }) {
    const [activeTab, setActiveTab] = useState('')

    useEffect(() => {
        setActiveTab(defaultTab)
    }, [defaultTab])

    return (
        <div>
            <div className={getClasses(styles, ['grid', 'grid-gap-small'])}>
                {children.map((child) => (
                    <button
                        key={child.props.label}
                        className={getClasses(styles, child.props.label === activeTab ? ['tab', 'active-tab'] : ['tab'])}
                        onClick={() => setActiveTab(child.props.label)}>
                        <span>{child.props.label}</span>
                    </button>
                ))}
            </div>
            <div>
                {children.map((child) => child.props.label === activeTab && child)}
            </div>
        </div>
    )
}