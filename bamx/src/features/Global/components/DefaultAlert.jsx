import React from "react";
import styles from "../styles/alert.module.css"

const DefaultAlert = ({alertTitle, alertContent, closeAlert}) => {

  return (
      <div className={styles.alertBackground}>
            <h1 className={styles.alertTitle}> {alertTitle} </h1>
            <h2 className={styles.alertContent}> {alertContent} </h2>
            <button onClick={() => closeAlert()} className={styles.closeAlert}>Aceptar</button>
      </div>   
  );
}

export default DefaultAlert;