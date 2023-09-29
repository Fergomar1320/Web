import React from "react";
import "../styles/Dashboard.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {


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
};

export default Dashboard;
