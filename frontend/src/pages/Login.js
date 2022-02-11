import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { setAuthedUser } from '../actions/authedUser';
import { _register, _login } from '../services/_DATA';
import styles from './Login.module.css';
import logo from '../assets/images/logo_large.png';
import Tabs from '../components/Tabs'
import InputField from '../components/InputField'
import FormButton from '../components/FormButton'
import FormHelptext from '../components/FormHelptext'


/**
* @description Component for the login page to authenticate/impersonate a user
* @constructor
*/
export default function Login() {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
        avatar: null
    })

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

        if (username && password) {
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

        if (first_name && last_name && email && username && password && avatar) {
            _register(formData)
                .then(() => {

                })
        }
    }

    return (
        <div>
            <center>
                <img
                    src={logo}
                    alt='main logo'
                    className={styles['logo']}
                />
            </center>
            <Tabs defaultTab='Login'>
                <div
                    label='Login'
                    color='#0075ff'
                    className={styles['layout']}>
                    <InputField
                        name='username'
                        type='text'
                        placeholder="Username..."
                        value={formData.username}
                        handleChange={handleFieldChange}
                    />
                    <InputField
                        name='password'
                        type='password'
                        placeholder="Password..."
                        value={formData.password}
                        handleChange={handleFieldChange}
                    />
                    <FormButton
                        label='Login'
                        handleClick={handleUserLogin}
                    />
                    <FormHelptext text='All fields are required to login.' />
                </div>
                <div
                    label='Sign Up'
                    color='#0075ff'
                    className={styles['layout']}>
                    <div className={styles['section']}>
                        <div className={styles['layout']}>
                            <InputField
                                name='first_name'
                                type='text'
                                placeholder="First Name..."
                                value={formData.first_name}
                                handleChange={handleFieldChange}
                            />
                            <InputField
                                name='username'
                                type='text'
                                placeholder="Username..."
                                value={formData.username}
                                handleChange={handleFieldChange}
                            />
                            <InputField
                                name='email'
                                type='email'
                                placeholder="Email..."
                                value={formData.email}
                                handleChange={handleFieldChange}
                            />
                        </div>
                        <div className={styles['layout']}>
                            <InputField
                                name='last_name'
                                type='text'
                                placeholder="Last Name..."
                                value={formData.last_name}
                                handleChange={handleFieldChange}
                            />
                            <InputField
                                name='password'
                                type='password'
                                placeholder="Password..."
                                value={formData.password}
                                handleChange={handleFieldChange}
                            />
                        </div>
                    </div>
                    <FormHelptext text={formData?.avatar?.name} />
                    <FormButton
                        label='Select Profile Image'
                        color='#00B21D'
                        handleClick={handleAvatarUpload}
                    />
                    <FormButton
                        label='Sign Up'
                        handleClick={handleUserRegister}
                    />
                    <FormHelptext text='All fields are required to sign up.' />
                </div>
            </Tabs >
        </div >
    )
}