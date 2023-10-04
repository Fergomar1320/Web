import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { db } from "../../../config/FirebaseConnection";
import { collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const getPedidos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Requests"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setPedidos(docs);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getPedidos();
  }, [pedidos]);

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
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td style={{ textAlign: "center" }}>{`${pedido.requestNumber}` + pedido.id.substring(16)}</td>
                <td style={{ textAlign: "center" }}>{pedido.nameCorp}</td>
                <td style={{ textAlign: "center" }}>{pedido.status}</td>
                <td style={{ textAlign: "center" }}>{pedido.createdAt}</td>
              </tr>
            ))}
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
