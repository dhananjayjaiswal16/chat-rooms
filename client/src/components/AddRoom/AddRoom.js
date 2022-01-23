import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './AddRoom.module.css'

import { createRoom as startRoom } from '../../http/httpRoutes'

import { useSelector, useDispatch } from 'react-redux';
import { setAlertMsg, removeAlertMsg } from '../../store/alertSlice'
import Alert from '../pages/Alert/Alert'
import TextInput from '../Skeleton/textInputLayout/TextInput'

import { useHistory } from 'react-router-dom'

const AddRoom = ({ onClose }) => {
  const history = useHistory();
  const [selectedType, setSelectedType] = useState('open');
  const [topic, setTopic] = useState('');

  const id = uuidv4();
  const dispatch = useDispatch();

  const createRoom = async () => {
    if (!topic) {
      dispatch(setAlertMsg({ msg: 'Topic is a required field', id: id }))

      setTimeout(() => (
        dispatch(removeAlertMsg(id))
      ), 3500);
      return;
    }
    try {
      const { data } = await startRoom({ selectedType, topic });
      history.push(`/room/${data._id}`);
    } catch (err) {

    }
  }
  return (
    <div className={styles.entirePage}>
      <div className={styles.addRoomContainer}>
        <button onClick={onClose} className={styles.crossBtn}><i className="fas fa-times"></i></button>

        <div className={styles.header}>
          <h3 className={styles.headerText}>Enter topic to be searched</h3>
          <Alert />
          <TextInput fullwidth='true' value={topic} onChange={(e) => setTopic(e.target.value)} />
          <h2 className={styles.roomTypesHeaderText}>Room Types</h2>
          <div className={styles.roomTypeContainer}>
            <div
              onClick={() => setSelectedType('open')}
              className={`${styles.roomType} ${selectedType === 'open' ? styles.active : ''}`}
            >
              <img src="/images/global_img.png" alt="global-icon" />
              <span>Open</span>
            </div>

            <div
              onClick={() => setSelectedType('social')}
              className={`${styles.roomType} ${selectedType === 'social' ? styles.active : ''}`}
            >
              <img className={styles.image2and3} src="/images/community_img.png" alt="global-icon" />
              <span>Social</span>
            </div>

            <div
              onClick={() => setSelectedType('private')}
              className={`${styles.roomType} ${selectedType === 'private' ? styles.active : ''}`}
            >
              <img className={styles.image2and3} src="/images/private_img.png" alt="global-icon" />
              <span>Private</span>
            </div>

          </div>
        </div>

        <div className={styles.footer}>
          <h3 className={styles.footerText}>Start your room!</h3>
          <button onClick={createRoom} className={styles.startRoomBtn}>
            <i className="fas fa-microphone"></i>
                        Lets Go!
                    </button>
        </div>
      </div>
    </div>
  )
}

export default AddRoom
