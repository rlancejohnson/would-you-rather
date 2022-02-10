import { useSelector } from 'react-redux';
import { getClasses } from '../services/utils';
import styles from './Leaderboard.module.css';
import Avatar from '../components/Avatar';

/**
* @description Component for the leaderboard page to show user scores
* @constructor
*/
export default function Leaderboard() {
    const { users, sortedUserIds } = useSelector(state => {
        return {
            users: state.users,
            sortedUserIds: Object.keys(state.users).sort((a, b) => {
                const a_score = (Object.keys(state.users[a].answers).length + state.users[a].questions.length)
                const b_score = (Object.keys(state.users[b].answers).length + state.users[b].questions.length)

                return b_score - a_score
            })
        };
    });

    return (
        <div className={getClasses(styles, ['grid-vertical'])}>
            <div className={getClasses(styles, ['content-area', 'title'])}>
                Leaderboard
            </div>
            <div className={getClasses(styles, ['form'])}>
                <div className={getClasses(styles, ['score-card-list', 'grid-vertical', 'grid-gap-small'])}>
                    {sortedUserIds && sortedUserIds.map(userId => (
                        <div
                            key={userId}
                            className={getClasses(styles, ['grid', 'grid-gap-small', 'score-card', 'baseline'])}>
                            <div>
                                <Avatar
                                    url={users[userId].avatarURL}
                                    diameter={75}
                                />
                            </div>
                            <div className={getClasses(styles, ['grid-vertical', 'score-details'])}>
                                <div className={getClasses(styles, ['username'])}>
                                    {users[userId].name}
                                </div>
                                <div>Questions Answered: {Object.keys(users[userId].answers).length}</div>
                                <div>Questions Asked: {users[userId].questions.length}</div>
                            </div>
                            <div className={getClasses(styles, ['grid-vertical', 'score-badge'])}>
                                <div className={getClasses(styles, ['score-label'])}>
                                    Score
                                </div>
                                <div className={getClasses(styles, ['score'])}>
                                    {Object.keys(users[userId].answers).length + users[userId].questions.length}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}