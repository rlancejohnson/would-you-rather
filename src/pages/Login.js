import { useDispatch, useSelector } from 'react-redux'

import styles from './Login.module.css'
import logo from '../assets/images/logo_large.png'

export default function Login() {
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users)

    console.log(users)

    return (
        <div className={styles['layout']}>
            <div className={styles['section']}>
                <img
                    src={logo}
                    alt='main logo'
                    className={styles['logo']}
                />
            </div>
            <div className={styles['section']}>
                <select className={styles['user-selector']}>
                    {Object.keys(users).map((userId) => (
                        <option
                            key={userId}
                            value={userId}>
                            {users[userId].name}
                        </option>
                    ))}
                </select>
            </div>

        </div>
    )
}