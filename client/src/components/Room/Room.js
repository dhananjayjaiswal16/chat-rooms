import React from 'react'
import styles from './Room.module.css'
import { useHistory } from 'react-router-dom'

const Room = ({ room }) => {
    const history = useHistory();
    if (!room) return;
    return (
        <div className={styles.roomCard} onClick={() => history.push(`/room/${room._id}`)}>
            <div className={styles.roomTopic}>
                {room.topic}
            </div>
            <div className={`${styles.speakers} ${room.speakers.length === 1 ? styles.forSingleSpeaker : ''}`}>
                <div className={styles.avatars}>
                    {
                        room.speakers.map(speaker => (
                            <img key={speaker.id} className={styles.avatar} src={speaker.avatar} alt="speaker-img" />
                        ))
                    }
                </div>
                <div className={styles.names}>
                    {
                        room.speakers.map(speaker => (
                            <div key={speaker.id}>
                                <span>{speaker.name}</span> <i className="fas fa-comment-dots"></i>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={styles.memberCount}>
                <span>{room.totalPeople}</span><i className="fas fa-user"></i>
            </div>
        </div>
    )
}

export default Room;