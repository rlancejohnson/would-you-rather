import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';
import styles from './Header.module.css';
import logo from '../assets/images/logo_small.png';
import logoutIcon from '../assets/images/logout_icon.png';
import Avatar from './Avatar';

/**
* @description Component for site header
* @constructor
*/
export default function Header() {
    const dispatch = useDispatch();
    const { authedUser, users } = useSelector((state) => {
        return {
            authedUser: state.authedUser,
            users: state.users
        };
    });

    const navLinks = [
        { label: 'Home', path: '/', color: '#00B21D' },
        { label: 'New Question', path: '/add', color: '#FFC700' },
        { label: 'Leaderboard', path: '/leaderboard', color: '#FF0000' },
    ];

    const handleLogout = () => {
        sessionStorage.removeItem('accessToken')
        dispatch(setAuthedUser(null));
    }

    return (
        <div className={styles['container']}>
            <div className={styles['layout']}>
                <div className={styles['logo']}>
                    <img
                        src={logo}
                        alt='logo'
                    />
                </div>
                <div className={styles['nav-links']}>
                    {navLinks.map(({ label, path, color }) => (
                        <div
                            key={label}
                            className={styles['nav-link']}
                            style={{ borderBottom: `3px solid ${color}` }}>
                            <NavLink
                                to={path}
                                className={isActive => isActive ? `${styles['nav-link']} ${styles['active']}` : `${styles['nav-link']}`}>
                                {label}
                            </NavLink>
                        </div>
                    ))}
                </div>
                {authedUser && (
                    <div className={styles['profile']}>
                        <Avatar
                            url={users[authedUser]?.avatarURL}
                            diameter='40px' />
                        <span className={styles['profile-name']}>{users[authedUser]?.name}</span>
                        <Link
                            to='/login'
                            className={styles['logout-button']}
                            onClick={handleLogout}>
                            <img
                                src={logoutIcon}
                                alt='logout'
                            />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}