import React, { useEffect, useState } from "react";
import app from "../../../config/FirebaseConnection";
import {useAuthState} from "react-firebase-hooks/auth";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../../../config/FirebaseConnection";

import {createUserWithEmailAndPassword} from 'firebase/auth';
import { getFirestore, collection, addDoc } from "firebase/firestore";
const auth = getAuth(app);

const RegisterAlly = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [allyName, setAllyName] = useState('');
  const [allyEmail, setAllyEmail] = useState('');
  const [allyCompany, setAllyCompany] = useState('');
  const [allyPhone, setAllyPhone] = useState('');
  const [allyPassword, setAllyPassword] = useState('');
  const [allyConfirmPassword, setAllyConfirmPassword] = useState('');
  const [allyAddress, setAllyAddress] = useState('');
  const [allyType, setAllyType] = useState(false);
  const navigate = useNavigate();

  const generatePassword = () => { 
    let charset = "!@#$%^&*0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
    let newPassword = ""; 

    for (let i = 0; i < 12; i++) { 
        newPassword += charset.charAt( 
            Math.floor(Math.random() * charset.length) 
        ); 
    } 

    setAllyPassword(newPassword); 
  }; 

  const Validation = (e) => {
    var emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    var textRegex = /^[a-zA-Z]+(([',.-][a-zA-Z])?[ a-zA-Z]*)*$/;
    var numRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if(!textRegex.test(allyName)){
      //cambiar por alertas
      console.log("Nombre Invalido");
      return false;
    }
    else{
      console.log("Nombre Válido:", allyName);
    }

    if(!emailRegex.test(allyEmail)){
      console.log("Email inválido");
      return false;
    }
    else{
      console.log("Email válido:", allyEmail);
    }

    if(!allyType){
      if(!textRegex.test(allyCompany)){
        console.log("Empresa Inválida");
        return false;
      }
      else{
        console.log("Empresa válida: ", allyCompany);
      }
      if(!textRegex.test(allyAddress)){
        console.log("Dirección Inválida");
        return false;
      }
      else{
        console.log("Dirección válida: ", allyAddress);
      }
    }


    if(!numRegex.test(allyPhone)){
      console.log("Teléfono Inválido");
      return false;
    }
    else{
      console.log("Teléfono válido: ", allyPhone);
    }

    return true;
  }

  const handleSignup = () => {
    //CAMBIAR ESTO POR IMPLEMENTACIÓN EN FIREBASE
    // MANDAR CONTRA POR CORREO
    if(Validation()){
      generatePassword();
      console.log("password: "+allyPassword)
      console.log("User created successfully!");
      return true;
    }
    else{
      console.log("Failed to register a new ally!");
      return true;
    }
  }

  const individualAlly = () => {
    setAllyType(true);
  }

  const organizationAlly = () => {
    setAllyType(false);
  }

  if(!allyType){
    return (
      <>
        <div>
          <div>
            <button onClick={individualAlly}>Individual</button>
            <button onClick={organizationAlly}>Empresa</button>
          </div>
          
          <form>
            <label>
                Nombre del Aliado
                <input 
                  type="text" 
                  name = "allyName" 
                  value={allyName} 
                  onChange={(e) => setAllyName(e.target.value)}>
                </input>
            </label>
            <label>
                Correo electrónico
                <input 
                  type="text" 
                  name = "allyEmail" 
                  value={allyEmail}
                  onChange={(e) => setAllyEmail(e.target.value)}>
                </input>
            </label>
            <label>
                Empresa
                <input 
                  type="text" 
                  name = "allyCompany" 
                  value={allyCompany}
                  onChange={(e) => setAllyCompany(e.target.value)}>
                </input>
            </label>
            <label>
                Dirección de la Empresa
                <input 
                  type="text" 
                  name = "allyAddress" 
                  value={allyAddress}
                  onChange={(e) => setAllyAddress(e.target.value)}>
                </input>
            </label>
            <label>
                Teléfono
                <input 
                  type="text" 
                  name = "allyPhone" 
                  value={allyPhone}
                  onChange={(e) => setAllyPhone(e.target.value)}>
                </input>
            </label>
          </form>
          <button onClick={handleSignup}>Registrar</button>
          <button onClick={() => {navigate("/dashboard")}}>Cancelar</button>
        </div>
      </>
    )
  }
  else{
    return(
      <>
        <div>
          <div>
            <button onClick={individualAlly}>Individual</button>
            <button onClick={organizationAlly}>Empresa</button>
          </div>
          
          <form>
            <label>
                Nombre del Aliado
                <input 
                  type="text" 
                  name = "allyName" 
                  value={allyName} 
                  onChange={(e) => setAllyName(e.target.value)}>
                </input>
            </label>
            <label>
                Correo elctrónico
                <input 
                  type="text" 
                  name = "allyEmail" 
                  value={allyEmail}
                  onChange={(e) => setAllyEmail(e.target.value)}>
                </input>
            </label>
            <label>
                Teléfono
                <input 
                  type="text" 
                  name = "allyPhone" 
                  value={allyPhone}
                  onChange={(e) => setAllyPhone(e.target.value)}>
                </input>
            </label>
          </form>
          <button onClick={handleSignup}>Registrar</button>
          <button onClick={() => {navigate("/dashboard")}}>Cancelar</button>
        </div>
      </>
    )
  }
};

export default RegisterAlly;