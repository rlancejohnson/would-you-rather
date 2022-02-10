import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { setAuthedUser } from '../actions/authedUser';
import { _register, _login } from '../services/_DATA';
import styles from './Login.module.css';
import logo from '../assets/images/logo_large.png';


/**
* @description Component for the login page to authenticate/impersonate a user
* @constructor
*/
export default function Login() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('login')
    const [formError, setFormError] = useState('')
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
        avatar: null
    })

    const handleTabChange = (e) => {
        const { id } = e.target

        setActiveTab(id)
        setFormError('')
    }

    const handleFieldChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleAvatarUpload = (e) => {
        let avatarInput = document.createElement('input')
        avatarInput.type = 'file'
        avatarInput.accept = 'image/*'
        avatarInput.addEventListener('change', (e) => {
            setFormData({
                ...formData,
                avatar: e.target.files[0]
            })
        })

        avatarInput.dispatchEvent(new MouseEvent('click'))
    }

    const handleUserLogin = () => {
        const { username, password } = formData

        if (!username || !password) {
            setFormError('All fields are required to login.')

        } else {
            _login(username, password)
                .then(({ token, username }) => {
                    sessionStorage.setItem('accessToken', token)

                    const csrfToken = Cookies.get('csrftoken')
                    sessionStorage.setItem('csrfToken', csrfToken)

                    dispatch(setAuthedUser(username))
                    navigate(location.state?.from?.pathname || '/', { replace: true });
                })
        }
    }

    const handleUserRegister = () => {
        const { first_name, last_name, email, username, password, avatar } = formData

        if (!first_name || !last_name || !email || !username || !password || !avatar) {
            setFormError('All fields are required to login.')

        } else {
            _register(formData)
                .then(() => {
                    setActiveTab('login')
                })
        }
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
                <div className={styles['layout']}>
                    <div>
                        <div
                            id='login'
                            onClick={handleTabChange}>
                            Login
                        </div>
                        <div
                            id='register'
                            onClick={handleTabChange}>
                            Sign Up
                        </div>
                    </div>
                    {formError && (
                        <div>{formError}</div>
                    )}
                    <div className={styles['layout']}>
                        {activeTab === 'login' && (
                            <div>
                                <input
                                    name='username'
                                    type='text'
                                    placeholder="Username..."
                                    value={formData.username}
                                    onChange={handleFieldChange}
                                />
                                <input
                                    name='password'
                                    type='password'
                                    placeholder="Password..."
                                    value={formData.password}
                                    onChange={handleFieldChange}
                                />
                                <button
                                    onClick={handleUserLogin}>
                                    Login
                                </button>
                            </div>
                        )}
                        {activeTab === 'register' && (
                            <div>
                                <input
                                    name='first_name'
                                    type='text'
                                    placeholder="First Name..."
                                    value={formData.first_name}
                                    onChange={handleFieldChange}
                                />
                                <input
                                    name='last_name'
                                    type='text'
                                    placeholder="Last Name..."
                                    value={formData.last_name}
                                    onChange={handleFieldChange}
                                />
                                <input
                                    name='email'
                                    type='email'
                                    placeholder="Email..."
                                    value={formData.email}
                                    onChange={handleFieldChange}
                                />
                                <input
                                    name='username'
                                    type='text'
                                    placeholder="Username..."
                                    value={formData.username}
                                    onChange={handleFieldChange}
                                />
                                <input
                                    name='password'
                                    type='password'
                                    placeholder="Password..."
                                    value={formData.password}
                                    onChange={handleFieldChange}
                                />
                                <button
                                    onClick={handleAvatarUpload}>
                                    Select Profile Image
                                </button>
                                <button
                                    onClick={handleUserRegister}>
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}