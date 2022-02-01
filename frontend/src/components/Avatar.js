import styles from './Avatar.module.css';

/**
* @description Component for user avatar
* @constructor
* @param {string} url - the url for the image of the user
* @param {number} diameter - the size of a circular diameter
*/
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