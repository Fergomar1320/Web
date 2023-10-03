import React, { useState } from "react";
import styles from "../styles/style.module.css";
import Dashboard from "../../dashboard/views/Dashboard";

import app from "../../../config/FirebaseConnection";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";


const auth = getAuth(app);

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShown, setIsShown] = useState(false);
  const navigate = useNavigate();
  
  const togglePassword = () =>{
    setIsShown((isShown) => !isShown);
  }

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/dashboard");
        //return<Dashboard/>
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <section className={styles.screen}>
      <div className={styles.logo}>
        <img
          width={"100%"}
          src="https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Fassets%2Fsign_up%2Fbamx_logo.png?alt=media&token=bb2f494f-d3dc-41bc-87f7-b677e0e966d7"
          alt="BAMX logo"
        />
      </div>
      <h1 className={styles.loginText}>¡Bienvenido!</h1>
      <form>
        <div className={styles.welcome}>
          <input
            className={styles.container}
            placeholder="Username"
            type="text"
            id="username"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.welcome}>
          <input
            className={styles.container}
            placeholder="Password"
            type={isShown ? "text" : "password"}
            id="password"
            autoComplete="false"
            onChange={(e) => setPassword(e.target.value)}
          />

            <div className= {styles.checkboxContainer}>
                <label htmlFor="checkbox" className={styles.welcome}>Mostrar Constraseña</label>
                <input
                    id = "checkbox"
                    type = "checkbox"
                    checked = {isShown}
                    onChange={togglePassword}/>
                
            </div>
        </div>

        <button className={styles.button} onClick={onLogin}>
          Iniciar Sesión
        </button>
      </form>
    </section>
  );
};

export default Registration;
