import React, { useState, useEffect } from "react";
import NavbarCravus from "../components/NavbarCravus";
import axios from "axios";

import "./Dia.css";
import ModalLoading from "../components/ModalLoading";
import PedidoCard from "../components/PedidoCard";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";

const Dia = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pedidosDia, setPedidosDia] = useState([]);

  const getPedidosDia = async () => {
    setLoading(true);
    const token = localStorage.getItem("tokenApi");
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/orders/dayorders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPedidosDia(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    validateToken();
    getPedidosDia();
  }, []);

  const validateToken = async () => {
    await verifyToken().then((validToken) => {
      if (!validToken) {
        navigate("/");
      }
    });
  };

  return (
    <>
      <NavbarCravus />
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-offset-1 col-7">
            <h4 className="title-text">Pedidos do dia</h4>
          </div>
        </div>
        <hr />
        {pedidosDia.length > 0 &&
          pedidosDia.map((pedido, index) => {
            return (
              <div className="row justify-content-left p-2" key={index}>
                <div className="col">
                  <PedidoCard pedido={pedido} />
                </div>
              </div>
            );
          })}
      </div>
      <ModalLoading show={loading} onHide={() => setLoading(false)} />
    </>
  );
};

export default Dia;
