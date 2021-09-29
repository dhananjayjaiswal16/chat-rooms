import React from 'react'
import Rooms from '../pages/Rooms/Rooms';
import styles from './Room.module.css'
const Room = ({ room }) => {
    return (
        <>
            <div className={styles.roomCard}>
                <div className={styles.roomTopic}>
                    {room.topic}
                </div>
                <div className={styles.speakers}>
                    <div className={styles.avatars}>
                        {
                            room.speakers.map(speaker => (
                                <img className={styles.avatar} src={speaker.avatar} alt="speaker-img" />
                            ))
                        }
                    </div>
                    <div className={styles.names}>
                        {
                            room.speakers.map(speaker => (
                                <div>
                                    <span>{speaker.name}</span> <i class="fas fa-comment-dots"></i>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.memberCount}>
                    <span>{room.totalPeople}</span><i class="fas fa-user"></i>
                </div>
            </div>
        </>
    )
}

export default Room;