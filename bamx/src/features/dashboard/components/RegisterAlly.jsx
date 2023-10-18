// Base
import React, { useState } from "react";

// Firebase
import { db, auth } from "../../../config/FirebaseConnection";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";
import Modal from 'react-modal'

//ALERT
import DefaultAlert from "../../Global/components/DefaultAlert";

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
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmContent, setConfirmContent] = useState('');
  const [confirmTitle, setConfirmTitle] = useState('');
  const [confirmStatus, setConfirmStatus] = useState(false);

  function closeAlert(){
    setShowAlert(false);
  }

  function closeConfirm(){
    setShowConfirm(false);
  }

  function openConfirm(){
    setShowConfirm(true);
  }

  function newAlert(title, content){
      setAlertTitle(title);
      setAlertContent(content);
      setShowAlert(true);
  }

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
      await addDoc(collection(db, "userData"), user);
    } catch (error) {
      newAlert("Error inesperado", "Intente más tarde")
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
        newAlert("Listo!", "Se ha enviado un correo con la contraseña")
      } else {
        newAlert("Error Correo", "Por favor cambie a otro correo")
        return false;
      }
    }catch(error){
      newAlert("Error Correo", "Por favor cambie a otro correo")
      return false;
    }
  }

  const Validation = (e) => {
    var emailRegex = /^[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    var textRegex = /[a-zA-Z \u00E0-\u00FC-][a-zA-Z \u00E0-\u00FC-]*/;
    var addressRegex = /^[a-zA-Z]+(([',.-][a-zA-Z])?[ a-zA-Z#0-9,])*$/;
    //eslint-disable-next-line
    var numRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    if(!textRegex.test(allyName)){
      newAlert("Nombre inválido", "El nombre no es válido")
      return false;
    }

    if(!emailRegex.test(allyEmail)){
      newAlert("Correo inválido", "El correo ingresado no es válido")
      return false;
    }

    if(!allyType){
      if(!textRegex.test(allyCompany)){
        newAlert("Empresa inválida", "El nombre de la empresa no es válido")
        return false;
      }

      if(!addressRegex.test(allyAddress)){
        newAlert("Dirección inválida", "No use símbolos en la dirección")
        return false;
      }

    }

    if(!numRegex.test(allyPhone)){
      newAlert("Número inválido", "Verifique su número")
      return false;
    }

    return true;
  }

  const handleSignup = async () => {
    try {
        const allyPass = await generatePassword()
        await createUserWithEmailAndPassword(auth, allyEmail, allyPass)
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
        }).catch(() => {
          newAlert("Error inesperado", "Intente más tarde")
        });
    } catch (error) {
      newAlert("Error inesperado", "Intente más tarde")
    }
  }

  const handleCancel = () => {
    navigate("/dashboard");
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
            }}}>
            <DefaultAlert alertTitle={alertTitle} alertContent={alertContent} closeAlert={closeAlert}></DefaultAlert>
          </Modal>

          <Modal isOpen={showConfirm} onRequestClose={closeConfirm} ariaHideApp={false} style={{
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
            }}}>
            <div className={styles.confirmBackground}>
              <h1 className={styles.confirmTitle}> {confirmTitle} </h1>
              <h2 className={styles.confirmContent}> {confirmContent} </h2>
              <div>
                  <button onClick={() => {closeConfirm()}} className={styles.cancelButton}>Cancelar</button>
                  <button onClick={() => {
                    closeConfirm();
                    if(confirmStatus){
                      handleSignup();
                    } 
                    else{
                      handleCancel();
                    }
                    }} className={styles.confirmButton}>Aceptar</button>
              </div>
            </div>  
          </Modal>
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
            <button className={styles.newAllyButtons} onClick={ () => {
              setConfirmTitle("¿Estás seguro de que quieres continuar?")
              setConfirmContent("Estás a punto de registrar a un nuevo usuario, ¿estás seguro?")
              setConfirmStatus(true)
              if(Validation()){
                openConfirm()
              }
            } }>Registrar</button>
            <button className={styles.newAllyButtons} onClick={ () => {
              setConfirmTitle("¿Estás seguro de que quieres continuar?")
              setConfirmContent("Estás a punto de cancelar el registro, ¿estás seguro?")
              setConfirmStatus(false)
              setShowConfirm(true)
            } }>Cancelar</button>
          </div>
        </div>
        </section>
      </>
    )
  }

export default RegisterAlly;