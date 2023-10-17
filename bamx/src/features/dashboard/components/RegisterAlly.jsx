// Base
import React, { useEffect, useState } from "react";

// Firebase
import { db, auth } from "../../../config/FirebaseConnection";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";

// Styles
import styles from "../styles/Register.module.css";

// Others
import { useNavigate } from "react-router-dom";
import { MailSlurp } from 'mailslurp-client';

const crossFetch = require('cross-fetch');

const mailslurp = new MailSlurp({
  fetchApi: crossFetch,
  apiKey: "dc2e43a4f5f1ca12f5fb1ac438e739575f650a708ed381f789cd3af88aa0f3e0",
});


const RegisterAlly = () => {
  const [allyName, setAllyName] = useState('');
  const [allyEmail, setAllyEmail] = useState('');
  const [allyCompany, setAllyCompany] = useState('');
  const [allyPhone, setAllyPhone] = useState('');
  const [allyAddress, setAllyAddress] = useState('');
  const [allyType, setAllyType] = useState(false);

  const navigate = useNavigate();
  
  const generatePassword = async () => { 
    let charset = "!@#$%^&*0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
    let newPassword = ""; 

    for (let i = 0; i < 12; i++) { 
        newPassword += charset.charAt( 
            Math.floor(Math.random() * charset.length) 
        ); 
    } 
    return newPassword;
  };
  
  const addUser = async (user) => {
    try{
      const docRef = await addDoc(collection(db, "userData"), user);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };


  const sendMail = async (newPassword)  => {
    
    try{
      const inbox = await mailslurp.createInbox();
      const options = {
        to: [allyEmail],
        subject: 'Bienvenid@ a BAMX, ' +allyName,
        body: 'Tu contraseña para acceder a BAMX: ' + newPassword,
      };
      const sent = await mailslurp.sendEmail(inbox.id, options);
      if (sent) {
        console.log("email sent successfully!");
      } else {
        console.log("Failed to send email!");
        return false;
      }
    }catch(error){
      console.error("Error in handleSignup: ", error);
      return false;
    }
  }

  const Validation = (e) => {
    var emailRegex = /^[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    var textRegex = /^[a-zA-Z]+(([',.-][a-zA-Z])?[ a-zA-Z])$/;
    var addressRegex = /^[a-zA-Z]+(([',.-][a-zA-Z])?[ a-zA-Z#0-9,])*$/;
    var numRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    if(!textRegex.test(allyName)){
      //cambiar por alertas
      console.log("Nombre Invalido");
      return false;
    }

    if(!emailRegex.test(allyEmail)){
      console.log("Email inválido");
      return false;
    }

    if(!allyType){
      if(!textRegex.test(allyCompany)){
        console.log("Empresa Inválida");
        return false;
      }

      if(!addressRegex.test(allyAddress)){
        console.log("Dirección Inválida");
        return false;
      }

    }

    if(!numRegex.test(allyPhone)){
      console.log("Teléfono Inválido");
      return false;
    }

    return true;
  }

  const handleSignup = async () => {
    try {
      if(Validation()){
        const allyPass = await generatePassword()
        const userCredential = await createUserWithEmailAndPassword(auth, allyEmail, allyPass)
        .then(() => {
          const user = {
            name : allyName,
            address : allyAddress,
            nameCorp : allyCompany,
            phoneNumber: allyPhone,
            role: 'Ally',
            status: Boolean(true)
          };
          addUser(user);
          sendMail(allyPass)
        })
        .catch((error) => {
          console.log(error, "Failed to register a new ally!");
        });
      }
    } catch (error) {
      console.error("Error in handleSignup: ", error);
    }
  }
  

  const individualAlly = () => {
    setAllyType(true);
  }

  const organizationAlly = () => {
    setAllyType(false);
  }

    return (
      <>
        <section className={styles.screen}>
        <div>
          <div className={styles.logo}>
            <img
              width={"100%"}
              src="https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Mobile%2Fassets%2Fsign_up%2Fbamx_logo.png?alt=media&token=bb2f494f-d3dc-41bc-87f7-b677e0e966d7"
              alt="BAMX logo"
            />
          </div>
          <div className={styles.registerButtons}>
            <button className={styles.roleButtons} onClick={individualAlly} style={{backgroundColor: allyType ? 'rgba(56,181,3,0.3)' : '#fff', borderBottomWidth: allyType ? '4px' : '0px' }}>Individual</button>
            <button className={styles.roleButtons} onClick={organizationAlly} style={{backgroundColor: allyType ? '#fff' : 'rgba(56,181,3,0.3)', borderBottomWidth: allyType ? '0px' : '4px' }}>Empresa</button>
          </div>
          <form>
            <div className={styles.formStyle}>
              <div className={styles.formLabel}>
                <label>
                    <input 
                      className={styles.inputStyle}
                      placeholder="Nombre del Aliado"
                      type="text" 
                      name = "allyName" 
                      value={allyName} 
                      onChange={(e) => setAllyName(e.target.value)}>
                    </input>
                </label>
              </div>
              <div className={styles.formLabel}>
                <label>
                    <input
                      className={styles.inputStyle}
                      placeholder="Correo electrónico" 
                      type="text" 
                      name = "allyEmail" 
                      value={allyEmail}
                      onChange={(e) => setAllyEmail(e.target.value)}>
                    </input>
                </label>
              </div>
              { !allyType && 
                  <div className={styles.formLabel}>
                    <label>
                        <input 
                          className={styles.inputStyle}
                          placeholder="Empresa"
                          type="text" 
                          name = "allyCompany" 
                          value={allyCompany}
                          onChange={(e) => setAllyCompany(e.target.value)}>
                        </input>
                    </label>
                  </div>
              }
              { !allyType && 
                <div className={styles.formLabel}>
                  <label>
                      <input 
                        className={styles.inputStyle}
                        placeholder="Dirección de la Empresa"
                        type="text" 
                        name = "allyAddress" 
                        value={allyAddress}
                        onChange={(e) => setAllyAddress(e.target.value)}>
                      </input>
                  </label>
                </div>
              }
              <div className={styles.formLabel}>
                <label>
                    <input
                      className={styles.inputStyle}
                      placeholder="Teléfono" 
                      type="text" 
                      name = "allyPhone" 
                      value={allyPhone}
                      onChange={(e) => setAllyPhone(e.target.value)}>
                    </input>
                </label>
              </div>
            </div>
          </form>
          <div className={styles.newAllyContainer}>
            <button className={styles.newAllyButtons} onClick={handleSignup}>Registrar</button>
            <button className={styles.newAllyButtons} onClick={() => {navigate("/dashboard")}}>Cancelar</button>
          </div>
        </div>
        </section>
      </>
    )
  }

export default RegisterAlly;