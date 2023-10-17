import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import Sidebar from "../components/Sidebar";
import app from "../../../config/FirebaseConnection";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../../config/FirebaseConnection";
import {
  collection,
  onSnapshot,
  query,
  limit,
} from "firebase/firestore";

const auth = getAuth(app);

const Dashboard = () => {
  const [pedidos, setPedidos] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(null); // Estado de filtrado

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
      } else {
        // User is signed out
      }
    });
  }, []);

  useEffect(() => {
    const getPedidos = async () => {
      try {
        const userQuerySnapshot = collection(db, "userData");
        const docs = [];
        const unsubscribe = onSnapshot(userQuerySnapshot, (snapshot) => {
          snapshot.forEach((doc) => {
            const requestsQuerySnapshot = query(
              collection(db, "userData", doc.id, "requestsHistory"),
              limit(50)
            );
            onSnapshot(requestsQuerySnapshot, (snapshot2) => {
              snapshot2.docChanges().forEach((change) => {
                if (change.type === "added") {
                  docs.push({
                    ...change.doc.data(),
                    id: change.doc.id,
                    nameCorp: doc.data()["nameCorp"],
                  });
                }
              });
              setPedidos(docs);
            });
          });
        });
        return unsubscribe;
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getPedidos();
  }, []);

  const filteredPedidos = pedidos.filter((pedido) =>
    pedido.id.toLowerCase().includes(search.toLowerCase())
  );

  // Aplicar el filtro
  const filteredPedidosByStatus = filter
    ? filteredPedidos.filter((pedido) => pedido.status === filter)
    : filteredPedidos;

  const firstElevenPedidos = filteredPedidosByStatus.slice(0, 11);

  return (
    <section className="container">
      <section className="main">
        <section className="header">
          <section className="header-top">
            <img
              alt="bamx logo"
              width="125"
              height="102"
              src={require("../../../global assets/favicon.png")}
            />
            <Form>
              <InputGroup>
                <Form.Control
                  className="search"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por ID de pedido"
                />
              </InputGroup>
            </Form>
          </section>
          <section className="header-bottom">
            <section className="header-bottom_tittle">
              <p> Solicitudes </p>
            </section>
            <section className="header-bottom_navbar">
              <section className="header-bottom_buttons">
                <button
                  className={`btn1 ${filter === "Entregado" ? "active" : ""}`}
                  onClick={() => setFilter("Entregado")}
                >
                  Entregado
                </button>
                <button
                  className={`btn2 ${filter === "Pendiente" ? "active" : ""}`}
                  onClick={() => setFilter("Pendiente")}
                >
                  Pendientes
                </button>
                <button
                  className={`btn3 ${filter === "Cancelado" ? "active" : ""}`}
                  onClick={() => setFilter("Cancelado")}
                >
                  Cancelado
                </button>
                <button
                  className={`btn4 ${filter === "En camino" ? "active" : ""}`}
                  onClick={() => setFilter("En camino")}
                >
                  En camino
                </button>
              </section>
            </section>
          </section>
        </section>
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Id del cargamento</th>
              <th style={{ textAlign: "center" }}>Nombre de la empresa</th>
              <th style={{ textAlign: "center" }}>Estado del pedido</th>
              <th style={{ textAlign: "center" }}>Fecha de creación</th>
            </tr>
          </thead>
          <tbody>
            {firstElevenPedidos.map((pedido) => (
              <tr className="data" key={pedido.id}>
                <td style={{ textAlign: "center" }}>{`${pedido.id}`}</td>
                <td style={{ textAlign: "center" }}>{pedido.nameCorp}</td>
                <td style={{ textAlign: "center" }}>{pedido.status}</td>
                <td style={{ textAlign: "center" }}>{pedido.creationDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="side-bar">
        <Sidebar></Sidebar>
      </section>
    </section>
  );
};

export default Dashboard;
