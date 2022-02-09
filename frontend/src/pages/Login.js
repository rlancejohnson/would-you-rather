import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
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
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
        avatar: null
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    };

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

        _login(username, password)
            .then(({ token, username }) => {
                sessionStorage.setItem('accessToken', token)
                dispatch(setAuthedUser(username))
                navigate(location.state?.from?.pathname || '/', { replace: true });
            })
    }

    const handleUserRegister = () => {
        _register(formData)
            .then(() => {

            })
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
                            onClick={() => setActiveTab('login')}>
                            Login
                        </div>
                        <div
                            onClick={() => setActiveTab('register')}>
                            Sign Up
                        </div>
                    </div>
                    <div className={styles['layout']}>
                        {activeTab === 'login' && (
                            <div>
                                <input
                                    id='username'
                                    type='text'
                                    placeholder="Username..."
                                    onBlur={handleChange}
                                />
                                <input
                                    id='password'
                                    type='password'
                                    placeholder="Password..."
                                    onBlur={handleChange}
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
                                    id='first_name'
                                    type='text'
                                    placeholder="First Name..."
                                    onBlur={handleChange}
                                />
                                <input
                                    id='last_name'
                                    type='text'
                                    placeholder="Last Name..."
                                    onBlur={handleChange}
                                />
                                <input
                                    id='email'
                                    type='email'
                                    placeholder="Email..."
                                    onBlur={handleChange}
                                />
                                <input
                                    id='username'
                                    type='text'
                                    placeholder="Username..."
                                    onBlur={handleChange}
                                />
                                <input
                                    id='password'
                                    type='password'
                                    placeholder="Password..."
                                    onBlur={handleChange}
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