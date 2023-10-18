import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import { auth } from "../../../config/FirebaseConnection";
import Modal from "react-modal";

const Sidebar = ({ notifications, firstContacts }) => {
  const navigate = useNavigate();
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedDisplay, setSelectedDisplay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const joinedNotificationsAndContacts = notifications.concat(firstContacts);
  
  const openModal = (pedido) => {
    if(pedido.productName){
      setSelectedPedido(pedido);
      setSelectedDisplay(true);
    }else{
      setSelectedContact(pedido);
      setSelectedDisplay(false);
    }
    
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="side-bar_profile">
      <div>
        <div style={{ borderRadius: 50 }}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/bamx-cc64f.appspot.com/o/Web%2Fmahdi.jpg?alt=media&token=3086b1d2-3025-45b1-b568-0611820a77d6&_gl=1*1fki8bz*_ga*MjQ1OTk0NTYzLjE2OTIxOTcxOTI.*_ga_CW55HF8NVT*MTY5NzUxMDQyMy4xNTkuMS4xNjk3NTEwNzM1LjU3LjAuMA.."
            alt="Profile"
            style={{ width: 106, borderRadius: "50%" }}
          />
        </div>
        <div style={{ marginTop: 16 }} className="name">
          <div>{"Diego"}</div>
          <div>{"Fernández"}</div>
        </div>
        <section>
          <button
            className="register-ally"
            onClick={() => {
              navigate("/register-ally");
            }}
          >
            <h3 style={{fontFamily: 'Poppins', fontWeight: 400}}>Registrar Nuevo Aliado</h3>
          </button>
        </section>
        <div
          style={{
            marginTop: 40,
            backgroundColor: "#E1E1E1",
            height: 430,
            marginInline: 40,
            borderRadius: 24,
          }}
        >
          <div style={{display: "flex", justifyContent: "flex-end"}}>
            <div
              style={{
                display: "flex",
                width: 40,
                height: 40,
                backgroundColor: "red",
                position: "absolute",
                marginTop: -20,
                marginRight: 24,
                borderRadius: '50%',
                color: "#fff",
                alignItems: "center",
                justifyContent: "center",

              }}
            >
              {joinedNotificationsAndContacts.length}
            </div>
          </div>
          <h2 style={{ paddingTop: 16, margin: 0, paddingBlock: 8 }}>Notificaciones</h2>
          <div style={{ overflow: "scroll", height: 360 }}>
            {joinedNotificationsAndContacts.map((notification) => {
              return (
                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: 8,
                    marginBlock: 8,
                    marginInline: 24,
                    borderRadius: 8,
                  }}
                >
                  {notification.productName ? (
                    <div style={{}} onClick={() => openModal(notification)}>
                      <h3>Nueva Solicitud</h3>
                      <p
                        style={{
                          textAlign: "center",
                          fontSize: 12,
                          marginBlock: 4,
                        }}
                      >
                        Se ha creado una nueva solicitud
                      </p>
                    </div>
                  ) : (
                    <div style={{}} onClick={() => openModal(notification)}>
                      <h3>Nuevo Contacto</h3>
                      <p
                        style={{
                          textAlign: "center",
                          fontSize: 12,
                          marginBlock: 4,
                        }}
                      >
                        Alguien desea donar
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <button
          onClick={() => {
            auth.signOut();
            navigate("/");
          }}
          className="btn btn-danger"
          style={{
            marginBlock: 40,
            backgroundColor: "transparent",
            borderWidth: 0,
            fontFamily: "Poppins",
            fontSize: 24,
            fontWeight: "regular",
            cursor: 'pointer',
          }}
        >
          Salir
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            position: "",
            margin: "12.5% 25%",
            background: "rgba(255, 255, 255)",
            WebkitOverflowScrolling: "touch",
            borderRadius: "20px",
            outline: "none",
            padding: "20px",
            overflow: "hidden",
          },
        }}
      >
        {(selectedPedido  || selectedContact) && (
          <>
          {selectedDisplay ? (<div>
            {}
            <h2>Detalles del Pedido: {selectedPedido.id}</h2>
            <p className="tittle-name">
              {" "}
              Nombre del cliente: {selectedPedido.name}
            </p>
            <p className="tittle-phone"> Contacto: {selectedPedido.phone}</p>
            <p className="tittle-cargo"> Contenido del cargamento: {selectedPedido.productName.join(", ")}</p>
            <p className="tittle-cargo"> Peso: {selectedPedido.weight.join(", ")}</p>
            <p className="tittle-cargo"> Unidad: {selectedPedido.unit.join(", ")}</p>

            <button className="btn-modal" onClick={closeModal}>
              Cerrar
            </button>
          </div>) : 
          <div>
            <h2>Detalles del Contacto:</h2>
            <p className="tittle-name">
              Nombre del cliente: {selectedContact.name}
            </p>
            <p className="tittle-phone"> Número: {selectedContact.phone}</p>
            <p className="tittle-cargo"> Email: {selectedContact.email}</p>

            <button className="btn-modal" onClick={closeModal}>
              Cerrar
            </button>
          </div>}
          </>

        )}
      </Modal>
    </section>
  );
};

export default Sidebar;
