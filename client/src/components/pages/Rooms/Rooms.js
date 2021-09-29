import React from 'react'
import styles from './Rooms.module.css'

const Rooms = () => {

    return (
        <div>
            <>
                <div className="container">
                    <div className={styles.topBar}>
                        <div className={styles.left}>
                            <span className={styles.heading}>Chat Rooms</span>
                            <div className={styles.search}>
                                <i class="fas fa-search"></i>
                                <input className={styles.searchInput} type="text" />
                            </div>
                        </div>
                        <div className={styles.right}>
                            <button className={styles.startRoomBtn}>
                                <i class="fas fa-microphone"></i>
                                <span className={styles.roomBtnText}>Start a room</span>
                            </button>
                        </div>
                    </div>

                </div>
            </>

        </div>
    )
}


export default Rooms;
