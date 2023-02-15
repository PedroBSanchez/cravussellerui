import React, { useState, useEffect } from "react";

import { AiFillPlusCircle } from "react-icons/ai";
import { Button } from "react-bootstrap";

import NavbarCravus from "../components/NavbarCravus";
import ModalCreateOrder from "../components/ModalCreateOrder";
import "./Pedidos.css";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../utils/verifyToken";

const Pedidos = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    validateToken();
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
        <div
          className="row text-center justify-content-center"
          style={{ marginTop: "25vh" }}
        >
          <div className="col">
            <Button variant="bg-dark">
              <AiFillPlusCircle
                size={80}
                onClick={() => {
                  setShowModal(true);
                }}
                className="create-order-icon"
              />
            </Button>
          </div>
        </div>
      </div>
      <ModalCreateOrder
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      />
    </>
  );
};

export default Pedidos;
