import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import ModalLoading from "./ModalLoading";

import "./ModalNewClient.css";
import swal from "sweetalert";

import axios from "axios";

const ModalNewClient = (props) => {
  const [loading, setLoading] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [phoneValid, setPhoneValid] = useState(false);

  let phoneMask;
  const handlePhone = (value) => {
    if (value != undefined) {
      let input = value;
      input = phoneMaskChange(input);
      phoneMask = input;
      document.getElementById("phoneInput").value = phoneMask;
    }
  };

  const phoneMaskChange = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
  };

  const validatePhone = () => {
    if (
      phoneMask.includes("(") &&
      phoneMask.includes(")") &&
      phoneMask.includes("-") &&
      phoneMask.length > 14
    ) {
      setPhoneValid(true);
      return true;
    }
    setPhoneValid(false);
    return false;
  };

  const setPhoneWithoutMask = () => {
    let phoneWithoutMask = newClientPhone;

    phoneWithoutMask = phoneWithoutMask.split(" ");
    phoneWithoutMask[0] = phoneWithoutMask[0].replace("(", "");
    phoneWithoutMask[0] = phoneWithoutMask[0].replace(")", "");
    phoneWithoutMask[1] = phoneWithoutMask[1].replace("-", "");

    //how join two strings in javascript?
    return `${phoneWithoutMask[0]}${phoneWithoutMask[1]}`;
  };

  const handleNewClient = async () => {
    if (newClientName == "" || !phoneValid) {
      return swal({ title: "Campos Inválidos", icon: "warning" });
    }

    const token = localStorage.getItem("tokenApi");

    const options = {
      url: `${process.env.REACT_APP_BASE_URL}/api/clients/create`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: newClientName,
        phone: setPhoneWithoutMask(),
      },
    };

    setLoading(true);
    await axios
      .request(options)
      .then((response) => {
        props.getClients();
        setLoading(false);
        setNewClientPhone("");
        setNewClientName("");
        document.getElementById("phoneInput").value = null;
        setPhoneValid(false);
        props.onHide();
        swal({
          icon: "success",
          title: "Cliente Cadastrado com sucesso",
        });
      })
      .catch((error) => {
        setLoading(false);
        setNewClientPhone("");
        setNewClientName("");
        document.getElementById("phoneInput").value = null;
        setPhoneValid(false);
        props.onHide();
        swal({
          icon: "error",
          title: "Falha ao cadastrar cliente",
        });
      });
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <div className="row">
            <h4>Novo Cliente</h4>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row mt-2">
            <div className="col">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                id="nameInput"
                type="text"
                onChange={(e) => {
                  setNewClientName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <Form.Label>Número Telefone</Form.Label>
              <Form.Control
                id="phoneInput"
                type="tel"
                maxLength={15}
                isValid={phoneValid}
                placeholder="(DDD)"
                onChange={(e) => {
                  setNewClientPhone(e.target.value);
                  handlePhone(e.target.value);
                  validatePhone();
                }}
              />
            </div>
          </div>
          <div className="row mt-3 text-right justify-content-end">
            <div className="col-2">
              <button className="btn btn-danger" onClick={props.onHide}>
                Cancelar
              </button>
            </div>
            <div className="col-2">
              <button className="btn btn-success" onClick={handleNewClient}>
                Salvar
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <ModalLoading show={loading} onHide={() => setLoading(false)} />
    </>
  );
};
export default ModalNewClient;
