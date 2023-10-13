import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "../styles/Dashboard.css";

const Header = () => {
  const [setSearch] = useState("");

  return (
    <section className="header">
      <section className="header-top">
        <section className="header-logo">
          <img
            alt="bamx logo"
            width="125"
            height="102"
            src={require("../../../global assets/favicon.png")}
          />
        </section>
        <section className="header-top_search">
          <Form>
            <InputGroup>
              <Form.Control
                className="search"
                onChange={() => setSearch()}
                placeholder="Buscar por ID de pedido"
              />
            </InputGroup>
          </Form>
        </section>
      </section>

      <section className="header-bottom">
        <section className="header-bottom_tittle">
          <p> Solicitudes </p>
        </section>
        <section className="header-bottom_navbar">
          <section className="header-bottom_buttons">
            <button className="btn1">Aceptados</button>
            <button className="btn2">Pendientes</button>
            <button className="btn3">Cancelados</button>
          </section>
        </section>
      </section>
    </section>
  );
};

export default Header;