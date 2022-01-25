import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown } from 'react-dropdown-now'
import 'react-dropdown-now/style.css';

import { setAuthedUser } from '../actions/authedUser'

import styles from './Login.module.css'
import logo from '../assets/images/logo_large.png'

export default function Login() {
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users)

    const handleChange = (userId) => {
        dispatch(setAuthedUser(userId))
    }

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
                <Dropdown
                    placeholder="Select a user to login..."
                    className={styles['user-selector']}
                    options={Object.keys(users).map((userId) => { return { value: userId, label: users[userId].name } })}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}