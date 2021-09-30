import React, { useState } from 'react';
import styles from './AddRoom.module.css'

import TextInput from '../Skeleton/textInputLayout/TextInput'
const AddRoom = ({ onClose }) => {
    const [selectedType, setSelectedType] = useState('open');
    const [topic, setTopic] = useState('');

    return (
        <div className={styles.entirePage}>
            <div className={styles.addRoomContainer}>
                <button onClick={onClose} className={styles.crossBtn}><i class="fas fa-times"></i></button>
                <div className={styles.header}>
                    <h3 className={styles.headerText}>Enter topic to be searched</h3>
                    <TextInput fullWidth='true' value={topic} onChange={(e) => setTopic(e.target.value)} />
                    <h2 className={styles.roomTypesHeaderText}>Room Types</h2>
                    <div className={styles.roomTypeContainer}>
                        <div onClick={() => setSelectedType('open')} className={`${styles.roomType} ${selectedType === 'open' ? styles.active : ''}`}>
                            <img src="/images/global_img.png" alt="global-icon" />
                            <span>Open</span>
                        </div>
                        <div onClick={() => setSelectedType('social')} className={`${styles.roomType} ${selectedType === 'social' ? styles.active : ''}`}>
                            <img className={styles.image2and3} src="/images/community_img.png" alt="global-icon" />
                            <span>Social</span>
                        </div>
                        <div onClick={() => setSelectedType('private')} className={`${styles.roomType} ${selectedType === 'private' ? styles.active : ''}`}>
                            <img className={styles.image2and3} src="/images/private_img.png" alt="global-icon" />
                            <span>Private</span>
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <h3 className={styles.footerText}>Start your room!</h3>
                    <button className={styles.startRoomBtn}><i className="fas fa-microphone"></i> Lets Go!</button>
                </div>
            </div>
        </div>
    )
}

export default AddRoom
