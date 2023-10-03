import React from "react";
import "../styles/Dashboard.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";

import app from "../../../config/FirebaseConnection";
import {useAuthState} from "react-firebase-hooks/auth";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import { Navigate } from "react-router-dom";

const auth = getAuth(app);

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        console.log(uid);
      } else {
        // User is signed out
      }
    });
  }, []);

  if (!user) {
    //redirect to login page
    return <Navigate replace to = "/login" />
  } else {
      return (
        <section className="container">
          <section className="main">
            <Header></Header>
            <table className="styled-table">
            <thead>
                <tr>
                  <th style={{ textAlign: "center" }}> Id</th>
                  <th style={{ textAlign: "center" }}> Nombre de la empresa </th>
                  <th style={{ textAlign: "center" }}> Estado del pedido </th>
                  <th style={{ textAlign: "center" }}> Fecha de creación </th>
                </tr>
              </thead>
            </table>
          </section>
    
          <section className="side-bar">
            <Sidebar></Sidebar>
          </section>
        </section>
      );
  }
};

export default Dashboard;
