import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getClasses } from '../services/utils';
import styles from './Home.module.css';
import Avatar from '../components/Avatar';
import Tabs from '../components/Tabs'

/**
* @description Component for the home page to display unanswered and answered questions
* @constructor
*/
export default function Home() {
    const { authedUser, users, questions } = useSelector(state => {
        return {
            authedUser: state.authedUser,
            users: state.users,
            questions: state.questions
        };
    });

    return (
        <div className={getClasses(styles, ['grid-vertical'])}>
            <Tabs defaultTab='Unanswered Questions'>
                <div
                    label='Unanswered Questions'
                    color='#00B21D'
                    className={getClasses(styles, ['grid', 'grid-gap-small', 'content-area'])}>
                    <div className={getClasses(styles, ['grid-vertical', 'content-area', 'form'])}>
                        {(questions && users[authedUser]?.answers) &&
                            Object.keys(questions).filter(qid => {
                                return !(qid in users[authedUser].answers)

                            }).sort((a, b) => {
                                return questions[b].timestamp - questions[a].timestamp

                            }).map(qid => (
                                <div
                                    key={qid}
                                    className={getClasses(styles, ['grid', 'grid-gap-small', 'question-card'])}>
                                    <div>
                                        <Avatar
                                            url={users[questions[qid].author].avatarURL}
                                            diameter={75}
                                        />
                                    </div>
                                    <div className={getClasses(styles, ['grid-vertical', 'question-details'])}>
                                        <div>{`${users[questions[qid].author].name} asks:`}</div>
                                        <div className={getClasses(styles, ['template-text'])}>Would you rather...</div>
                                        <div>{`${questions[qid].optionOne.text} OR ${questions[qid].optionTwo.text}`}</div>
                                    </div>
                                    <div className={getClasses(styles, ['grid-vertical'])}>
                                        <Link to={`question/${qid}`}>
                                            <button className={getClasses(styles, ['answer-btn'])}>Answer</button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <div
                    label='Answered Questions'
                    color='#00B21D'
                    className={getClasses(styles, ['grid', 'grid-gap-small', 'content-area'])}>
                    <div className={getClasses(styles, ['grid-vertical', 'content-area', 'form'])}>
                        {users[authedUser]?.answers &&
                            Object.keys(users[authedUser].answers).sort((a, b) => {
                                return questions[b].timestamp - questions[a].timestamp

                            }).map(qid => (
                                <div
                                    key={qid}
                                    className={getClasses(styles, ['grid', 'grid-gap-small', 'question-card'])}>
                                    <div>
                                        <Avatar
                                            url={users[questions[qid].author].avatarURL}
                                            diameter={75}
                                        />
                                    </div>
                                    <div className={getClasses(styles, ['grid-vertical', 'question-details'])}>
                                        <div>{`${users[questions[qid].author].name} asks:`}</div>
                                        <div className={getClasses(styles, ['template-text'])}>Would you rather...</div>
                                        <div>{`${questions[qid].optionOne.text} OR ${questions[qid].optionTwo.text}`}</div>
                                        <div className={getClasses(styles, ['vote-text'])}>
                                            {`You Chose: ${questions[qid][users[authedUser].answers[qid]].text}`}
                                        </div>
                                    </div>
                                    <div className={getClasses(styles, ['grid-vertical'])}>
                                        <div className={getClasses(styles, ['grid-vertical'])}>

                                            <Link to={`question/${qid}`}>
                                                <button className={getClasses(styles, ['view-results-btn'])}>View Results</button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className={getClasses(styles, ['grid-vertical'])}>

                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </Tabs>
        </div >
    );
}