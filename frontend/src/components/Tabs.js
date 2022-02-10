import { useState } from 'react'
import { getClasses } from '../services/utils'
import styles from 'Tabs.module.css'
import Tab from './Tab'

export default function Tabs({ tabs, defaultTab, children }) {
    const [activeTab, setActiveTab] = useState(defaultTab);

    return (
        <div className={getClasses(styles, ['grid-vertical'])}>
            <div className={getClasses(styles, ['grid', 'grid-gap-small', 'content-area'])}>
                {tabs && tabs?.length > 0 && tabs.map((tab) => (
                    <Tab
                        label={tab.label}
                        color={tab.color}
                        setActiveTab={setActiveTab}
                    />
                ))}
                {children.map((child) => {
                    return child.props.label === activeTab && child
                })}
            </div>
        </div >
    )
}