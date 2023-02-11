import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Modal } from "react-bootstrap";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { sendWhatsapp } from "../utils/sendWhatsapp";
import swal from "sweetalert";

const ModalSendWpp = (props) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [phoneValid, setPhoneValid] = useState(false);

  let phoneMask;

  const handleSendWpp = () => {
    if (!phoneValid) {
      return swal({
        icon: "error",
        title: "Número de telefone inválido",
        timer: 2500,
      });
    }
    const dataPedido = new Date(props?.pedido.createdAt);

    if (props.pedido != undefined) {
      const dataFormatada = `${dataPedido.toLocaleDateString()} ${dataPedido.getHours()}:${dataPedido.getMinutes()}:${dataPedido.getSeconds()}`;

      let msg = `${props?.pedido?.city} - ${props?.pedido?.client} %0aData: ${dataFormatada} %0a%0aProdutos: `;
      props?.pedido.items.forEach((item) => {
        msg =
          msg +
          `%0a  - ${item.description} ${numberToReal(item.value)} - Unidades: ${
            item.amount
          }`;
      });

      msg = msg + `%0a%0aTotal pedido: ${numberToReal(props?.pedido.total)}`;
      sendWhatsapp(setPhoneWithoutMask(), msg);
    }
  };

  const numberToReal = (number) => {
    let numero = number.toFixed(2).split(".");
    numero[0] = "R$" + numero[0].split(/(?=(?:...)*$)/).join(".");
    return numero.join(",");
  };

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
    let phoneWithoutMask = phoneNumber;

    phoneWithoutMask = phoneWithoutMask.split(" ");
    phoneWithoutMask[0] = phoneWithoutMask[0].replace("(", "");
    phoneWithoutMask[0] = phoneWithoutMask[0].replace(")", "");
    phoneWithoutMask[1] = phoneWithoutMask[1].replace("-", "");

    //how join two strings in javascript?
    return `${phoneWithoutMask[0]}${phoneWithoutMask[1]}`;
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop
        centered
      >
        <Modal.Header>
          <div className="row">
            <div className="col">
              <h4>
                Nota Pedido <AiOutlineWhatsApp />
              </h4>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col">
              <Form.Label>Número Telefone</Form.Label>
              <Form.Control
                id="phoneInput"
                type="tel"
                maxLength={15}
                isValid={phoneValid}
                placeholder="(DDD)"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  handlePhone(e.target.value);
                  validatePhone();
                }}
              />
            </div>
          </div>
          <div className="row p-2 mt-4 text-center justify-content-center">
            <Button variant="success" onClick={handleSendWpp}>
              Enviar
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalSendWpp;
