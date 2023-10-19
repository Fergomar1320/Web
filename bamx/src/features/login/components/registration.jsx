import React, { useState } from "react";
import styles from "../styles/style.module.css";

import app from "../../../config/FirebaseConnection";
import { db } from "../../../config/FirebaseConnection";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal'

//ALERT
import DefaultAlert from "../../Global/components/DefaultAlert";
import { getDoc, doc } from "firebase/firestore";

const auth = getAuth(app);

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const navigate = useNavigate();
  
  const togglePassword = () =>{
    setIsShown((isShown) => !isShown);
  }

  const intruderFound = () => {
    auth.signOut();
    setAlertTitle("Usuario no autorizado");
    setAlertContent("El usuario no tiene permisos para acceder a esta aplicación");
    setShowAlert(true);
  }

  const onLogin = (e) => {
    e.preventDefault();
    if(email.match("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")!=null){
      if(password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")!=null){
        signInWithEmailAndPassword(auth, email, password)
          .then(async () => {
              await getDoc(doc(db, "userData", auth.currentUser.uid)).then((doc) => {
                doc.data().role === "Admin" ? navigate("/dashboard") : intruderFound();
              })
            })
          .catch((error) => {
            setAlertTitle("Error");
            setAlertContent(error.message);
            setShowAlert(true);
          });
      }
      else{
        setAlertTitle("Contraseña inválida");
        setAlertContent("La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número");
        setShowAlert(true);
      }
    }
    else{
      setAlertTitle("Correo inválido");
      setAlertContent("El correo debe contener un @ y un dominio válido");
      setShowAlert(true);
    }
  };

  function closeAlert(){
    setShowAlert(false);
  }

  return (
    <section className={styles.screen}>
      <Modal isOpen={showAlert} onRequestClose={closeAlert} ariaHideApp={false} style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
          },
          content: {
            position: '',
            margin: '12.5% 25%',
            border: '0',
            background: 'rgba(255, 255, 255, 0)',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px',
            overflow: 'hidden'
          }
  }}>
      <DefaultAlert alertTitle={alertTitle} alertContent={alertContent} closeAlert={closeAlert}></DefaultAlert>
      </Modal>
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
            placeholder="Correo"
            type="text"
            id="username"
            onChange={(e) => {
              setEmail(e.target.value);
            }
            }
          />
        </div>

        <div className={styles.welcome}>
          <input
            className={styles.container}
            placeholder="Contraseña"
            type={isShown ? "text" : "password"}
            id="password"
            autoComplete="false"
            onChange={(e) => {
              setPassword(e.target.value);
            }
            }
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
