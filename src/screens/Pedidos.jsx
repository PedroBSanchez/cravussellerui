import React, { useState } from "react";

import { AiFillPlusCircle } from "react-icons/ai";
import { Button } from "react-bootstrap";

import NavbarCravus from "../components/NavbarCravus";
import ModalCreateOrder from "../components/ModalCreateOrder";
import "./Pedidos.css";

const Pedidos = () => {
  const [showModal, setShowModal] = useState(false);

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
