import React, { useRef, useState, useEffect } from 'react';
import { RegistrationStyles } from "../styles/registrationStyles";
import "../styles/style.css";

import app from '../../../config/FirebaseConnection';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

import { NavLink, useNavigate } from 'react-router-dom';

const auth = getAuth(app);

const Registration = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) =>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) =>{
            const user = userCredential.user;
            //navigate("/home")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }
    

    return(
        <section className="screen">
            <div className="logo">
                <img width={'100%'} src = "https://s3-alpha-sig.figma.com/img/7949/0c4c/693a1740b876bde5ffe4761ed71a036b?Expires=1694390400&Signature=NxieEW4JVXhMt7Kr7OjYgiY9ut6Apy~~a0EXC-RtiVvyH5JUiDpLvMecYZFZLNJz6RAI2~2GvfvRnE3A2dEaum6s4sJwr8BZ~BzGV9s1BHZN1xoaFyY2RzhK47cz~UOL1pJ4gAbVUvd7gn9x0PKcwgJelVR487fCqDefILrXt4F-wTqdVARhbiWnCVaMo~FIKhl4F13ZmSqz0LWoKpoz0G8VOjBOP8U61I1tmdsicvbrzoUTbtAC7NFD-Ef8RRbB6ky5tTgmje8BZToD7lzDGT~4Cwj6Ou5DR15KkyhEPscli7b5CGmGt6HEkA0pQy05djzn8Eodt7axdkNbXlCJHg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="BAMX logo"/>
            </div>
            <h1 className="loginText">¡Bienvenido!</h1>
            <form>
                <div className="welcome">
                    <input className="container"
                        placeholder="Username"
                        type ="text"
                        id = "username"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="welcome">
                    <input className="container"
                        placeholder="Password"
                        type ="text"
                        id = "password"
                        autoComplete="false"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                
                    <button 
                        className="button"
                        onClick={onLogin}>Iniciar Sesión</button>

            </form>
        </section>
    )
}

export default Registration