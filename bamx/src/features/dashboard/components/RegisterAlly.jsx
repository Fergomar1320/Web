import React, { useEffect, useState } from "react";
import app from "../../../config/FirebaseConnection";
import {useAuthState} from "react-firebase-hooks/auth";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { Navigate } from "react-router-dom";
import { db } from "../../../config/FirebaseConnection";
import { collection, getDocs } from "firebase/firestore";

const RegisterAlly = () => {
    const [showForm, setShowForm] = useState(false);
    const [allyName, setAllyName] = useState('');
    const [allyEmail, setAllyEmail] = useState('');
    const [allyCompany, setAllyCompany] = useState('');
    const [allyPhone, setAllyPhone] = useState('');
    const [allyPassword, setAllyPassword] = useState('');
    const [allyConfirmPassword, setAllyConfirmPassword] = useState('');

    const toggleForm = () =>{
        setShowForm(!showForm);
    }

    return(
        <section>
            <button onClick={toggleForm}>
                Registrar Nuevo Aliado
            </button>
            {showForm && (
                <form>
                    <label>
                        Nombre del Aliado
                        <input type="text" name = "allyName" value={allyName}>
                        </input>
                    </label>
                    <label>
                        Correo elctrónico
                        <input type="text" name = "allyEmail" value={allyEmail}>
                        </input>
                    </label>
                    <label>
                        Empresa
                        <input type="text" name = "allyCompany" value={allyCompany}>
                        </input>
                    </label>
                    <label>
                        Teléfono
                        <input type="number" name = "allyPhone" value={allyPhone}>
                        </input>
                    </label>
                    <label>
                        Contraseña
                        <input type="text" name = "allyPassword" value={allyPassword}>
                        </input>
                    </label>
                    <label>
                        Confirmar contraseña
                        <input type="text" name = "allyConfirmPassword" value={allyConfirmPassword}>
                        </input>
                    </label>
                </form>
            )}
        </section>
    );
};

export default RegisterAlly;