import React from 'react'
import { useSelector } from 'react-redux';
import styles from './Alert.module.css';
const Alert = () => {
  const { alerts } = useSelector(state => state.alertSlice);
  return (

    alerts.length > 0 && alerts.map(alert => (
      <div className={styles.alert} >
        <i className="fas fa-info-circle"></i> {alert.msg}
      </div>
    ))

  )

}

export default Alert;
