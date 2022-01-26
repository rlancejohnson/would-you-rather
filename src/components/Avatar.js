import styles from './Avatar.module.css';

export default function Avatar({ url, diameter }) {
    const size = {
        width: diameter,
        height: diameter
    };

    return (
        <div>
            <img
                src={url}
                alt='avatar'
                className={styles['avatar-image']}
                style={size}
            />
        </div>
    );
}