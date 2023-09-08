import React from "react";
import { useState } from "react";
import NavbarCravus from "../components/NavbarCravus";
import axios from "axios";
import { useEffect } from "react";

import ModalLoading from "../components/ModalLoading";
import ModalNewClient from "../components/ModalNewClient";

import "./Clients.css";
import swal from "sweetalert";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModalNewClient, setShowModalNewClient] = useState(false);

  const getClients = async () => {
    const token = localStorage.getItem("tokenApi");

    setLoading(true);
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/clients/getall`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        setClients(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        swal.fire({ title: "Erro ao carregar clientes", icon: "error" });
      });
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <>
      <NavbarCravus />
      <div className="container">
        <div className="row mt-3">
          <div className="col-offset-1 col-3">
            <h4 className="title-text">Clientes</h4>
          </div>
          <div className="col">
            <button
              className="btn btn-success"
              onClick={() => {
                setShowModalNewClient(true);
              }}
            >
              Novo
            </button>
          </div>
        </div>
        <hr />
        <div className="row justify-content-center mt-2">
          <div className="col">
            <div className="client-table-container">
              <table className="table table-warning table-striped">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Telefone</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <p>{client?.name}</p>
                        </td>
                        <td>
                          <p className="client-number-table-text">
                            {client?.phone}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ModalLoading show={loading} onHide={() => setLoading(false)} />
      <ModalNewClient
        show={showModalNewClient}
        onHide={() => setShowModalNewClient(false)}
      />
    </>
  );
};

export default Clients;
