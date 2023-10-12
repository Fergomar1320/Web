import React, { useEffect, useState } from "react";
import app from "../../../config/FirebaseConnection";
import {useAuthState} from "react-firebase-hooks/auth";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { Navigate } from "react-router-dom";
import { db } from "../../../config/FirebaseConnection";

import {createUserWithEmailAndPassword} from 'firebase/auth';
import { getFirestore, collection, addDoc } from "firebase/firestore";

const auth = getAuth(app);

const RegisterAlly = () => {
    const [showForm, setShowForm] = useState(false);
    const [allyName, setAllyName] = useState('');
    const [allyEmail, setAllyEmail] = useState('');
    const [allyCompany, setAllyCompany] = useState('');
    const [allyPhone, setAllyPhone] = useState('');
    const [allyPassword, setAllyPassword] = useState('');
    const [allyConfirmPassword, setAllyConfirmPassword] = useState('');
    const [allyAddress, setAllyAddress] = useState('');

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitle, setAlertTitle] = useState('');

    const alertTrigger = (title, message) => {
        setAlertTitle(title);
        setAlertMessage(message);
        setShowAlert(!showAlert);
    };

    const ValidateEmail = async (email) =>{
        var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.value.match(emailFormat)){
            console.log("Valid email!");
            return true;
        }else{
            console.log("Invalid email");
            return false;
        }

    }

    const validateInputs = async () => {
        const emailRegex = new RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+[A-Z]{2,4}$')
        const nameRegex =  new RegExp^("[a-zA-Z]+(([',.-][a-zA-Z])?[ a-zA-Z]*)*$");
        const passwordRegex = new RegExp ("^(?=.*[a-z])(?=.*[A-Z])(?=.*)[a-zA-Z]{8,}$");
        const phoneRegex = new RegExp ("^[+]?[(]?[0-9]{3}[)]?[-]?[0-9]{3}[-]?[0-9]{4,6}$");
    
        // We start validation
    
        // Check if everything is filled
        if (allyName === '' || allyEmail === '' || allyPassword === '' || allyConfirmPassword === '') {
          console.log('Campos vacíos', 'Por favor llena todos los campos');
          return false;
        }
        // Check if name is valid
        if (!nameRegex.test(allyName)) {
            console.log('Nombre inválido', 'El nombre ingresado no es valido');
          return false;
        }
        // Check if email is valid
        if (!emailRegex.test(allyEmail)) {
            console.log('Correo inválido', 'El correo ingresado no es válido');
          return false;
        }
        // Check if phone number is valid
    
        if (!phoneRegex.test(allyPhone)) {
            console.log(
            'Número de teléfono inválido',
            'El número de teléfono ignresado no es válido',
          );
          return false;
        }
    
        // Check if password is valid
        if (!passwordRegex.test(allyPassword)) {
            console.log(
            'Contraseña inválida',
            'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número',
          );
          return false;
        }
        if (allyPassword !== allyConfirmPassword) {
            console.log('Contraseña inválida', 'Las contraseñas no coinciden');
          return false;
        }
        return true;
      };

    const toggleForm = () =>{
        setShowForm(!showForm);
    }

    /*const test = (e) => {
        e.preventDefault();
    }*/

    const handleSignUp = async (e) => {
        //e.preventDefault();
        // We start validation

        if (ValidateEmail(allyEmail)) {
        // If everything is valid, we proceed to create the user
        /*createUserWithEmailAndPassword(auth, allyEmail, allyPassword)
            .then(userCredential => {
            // Creating user data in firestore
            console.log('User created: ' + userCredential.user.uid);

            addDoc(collection(db, "userData"), {
                name: allyName,
                nameCorp: allyCompany,
                address: allyAddress,
                phoneNumber: Number(allyPhone),
                status: Boolean(false),
            })

                .then(() => {
                // Sending email verification to the user
                console.log('User data added');
                })
                .catch(error => {
                console.log('Error adding user data to firestore: ', error);
                });
            })
            .catch(error => {
            console.log('Error creating user: ', error);
            });*/
            console.log(validateInputs());
            console.log("Success!");
        }
    };
          
        return(
            <section>
                <button onClick={toggleForm}>
                    Registrar Nuevo Aliado
                </button>
                {showForm && (
                    <form onSubmit={handleSignUp()}>
                        <label>
                            Nombre del Aliado
                            <input 
                                type="text" 
                                name = "allyName" 
                                value={allyName}
                                onChange={e => setAllyName(e.target.value)}>
                            </input>
                        </label>
                        <label>
                            Correo elctrónico
                            <input 
                                type="text" 
                                name = "allyEmail" 
                                value={allyEmail}
                                onChange={e => setAllyEmail(e.target.value)}>
                            </input>
                        </label>
                        <label>
                            Empresa
                            <input 
                                type="text" 
                                name = "allyCompany" 
                                value={allyCompany}
                                onChange={e => setAllyCompany(e.target.value)}>
                            </input>
                        </label>
                        <label>
                            Teléfono
                            <input 
                                type="number" 
                                name = "allyPhone" 
                                value={allyPhone}
                                onChange={e => setAllyPhone(e.target.value)}>
                            </input>
                        </label>
                        <label>
                            Dirección
                            <input 
                                type="text" 
                                name = "allyAddress" 
                                value={allyAddress}
                                onChange={e => setAllyAddress(e.target.value)}>
                            </input>
                        </label>
                        <label>
                            Contraseña
                            <input 
                                type="text" 
                                name = "allyPassword" 
                                value={allyPassword}
                                onChange={e => setAllyPassword(e.target.value)}>
                            </input>
                        </label>
                        <label>
                            Confirmar contraseña
                            <input 
                                type="text" 
                                name = "allyConfirmPassword" 
                                value={allyConfirmPassword}
                                onChange={e => setAllyConfirmPassword(e.target.value)}>
                            </input>
                        </label>
                        <button>
                            Confirmar
                        </button>
                    </form>
                )}
            </section>
        );
    
};

export default RegisterAlly;