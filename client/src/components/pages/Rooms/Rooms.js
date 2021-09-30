import React, { useState } from 'react'
import styles from './Rooms.module.css'
import Room from '../../Room/Room'

import AddRoom from '../../AddRoom/AddRoom'

const rooms = [
    {
        id: 1,
        topic: 'Which framework best for frontend ?',
        speakers: [
            {
                id: 1,
                name: 'Dhananjay',
                avatar: '/react-logo.png',
            },
            {
                id: 2,
                name: 'Marshneil',
                avatar: '/react-logo.png',
            },
        ],
        totalPeople: 40,
    },
    {
        id: 2,
        topic: 'What’s new in machine learning?',
        speakers: [
            {
                id: 1,
                name: 'John Doe',
                avatar: '/react-logo.png',
            },
            {
                id: 2,
                name: 'Jane Doe',
                avatar: '/react-logo.png',
            },
        ],
        totalPeople: 40,
    },
    {
        id: 3,
        topic: 'Why people use stack overflow?',
        speakers: [
            {
                id: 1,
                name: 'Leo Messi',
                avatar: '/react-logo.png',
            },
            {
                id: 2,
                name: 'Antonella',
                avatar: '/react-logo.png',
            },
        ],
        totalPeople: 1040,
    },
    {
        id: 4,
        topic: 'Artificial inteligence is the future?',
        speakers: [
            {
                id: 1,
                name: 'Neymar',
                avatar: '/react-logo.png',
            },
            {
                id: 2,
                name: 'Mbappe',
                avatar: '/react-logo.png',
            },
        ],
        totalPeople: 140,
    },
];


const Rooms = () => {
    const [showAddRoom, setShowAddRoom] = useState(false);


    return (


        <>
            <div className="container">
                <div className={styles.topBar}>
                    <div className={styles.left}>
                        <span className={styles.heading}>Chat Rooms</span>
                        <div className={styles.search}>
                            <i className="fas fa-search"></i>
                            <input className={styles.searchInput} type="text" />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <button onClick={() => setShowAddRoom(true)} className={styles.startRoomBtn}>
                            <i className="fas fa-microphone"></i>
                            <span className={styles.roomBtnText}>Start a room</span>
                        </button>
                    </div>
                </div>
                <div className={styles.roomsList}>
                    {
                        rooms.map((room) => room && <Room key={room.id} room={room} />)
                    }
                </div>
            </div>
            {showAddRoom && <AddRoom onClose={() => setShowAddRoom(false)} />}
        </>


    )
}


export default Rooms;
