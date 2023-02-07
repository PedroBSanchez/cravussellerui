import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

import "./ModalCreateOrder.css";

const ModalCreateOrder = (props) => {
  const [newCity, setNewCity] = useState("");
  const [newClient, setNewClient] = useState("");

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop
      >
        <Modal.Header closeButton>
          <h3>Novo Pedido</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col">
              <Form.Label>Cidade</Form.Label>
              <Form.Control type="text" />
            </div>
            <div className="col">
              <Form.Label>Cliente</Form.Label>
              <Form.Control type="text" />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <Form.Label>Produto</Form.Label>
              <Form.Select aria-label="Default select example">
                <option disabled>Selecione um produto</option>
                <option value="1">One</option>
              </Form.Select>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalCreateOrder;
