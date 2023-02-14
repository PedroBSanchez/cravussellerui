import React, { useState } from "react";
import { FaStore } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { FaMoneyBillAlt } from "react-icons/fa";
import { BsFillClockFill } from "react-icons/bs";
import ModalSendWpp from "./ModalSendWpp";

import "./PedidoCard.css";
import { sendWhatsapp } from "../utils/sendWhatsapp";

const PedidoCard = (props) => {
  const [wppModalShow, setWppModalShow] = useState(false);

  const numberToReal = (number) => {
    let numero = number.toFixed(2).split(".");
    numero[0] = "R$" + numero[0].split(/(?=(?:...)*$)/).join(".");
    return numero.join(",");
  };

  const dateToHours = (dateParam) => {
    let novaData = new Date(dateParam);

    return `${novaData.getHours()}:${novaData.getMinutes()}:${
      novaData.getSeconds() > 9
        ? novaData.getSeconds()
        : "0" + novaData.getSeconds()
    }`;
  };

  const handleWppMessage = () => {
    const dataPedido = new Date(props?.pedido.createdAt);

    if (props.pedido != undefined) {
      const dataFormatada = `${dataPedido.toLocaleDateString()} ${dataPedido.getHours()}:${dataPedido.getMinutes()}:${dataPedido.getSeconds()}`;

      let msg = `${props?.pedido?.city} - ${props?.pedido?.client?.name} %0aData: ${dataFormatada} %0a%0aProdutos: `;
      props?.pedido.items.forEach((item) => {
        msg =
          msg +
          `%0a%0a  - ${item.description} ${numberToReal(
            item.value
          )} - Unidades: ${item.amount}`;
      });
      msg = msg + `%0a%0aTotal pedido: ${numberToReal(props?.pedido.total)}`;
      console.log(msg);
      console.log(props?.pedido.client?.phone);
      sendWhatsapp(props?.pedido.client?.phone, msg);
    }
  };

  return (
    <>
      <div className="pedido-card p-3" onClick={() => handleWppMessage(true)}>
        <div className="row">
          <div className="col">
            <FaStore color="white" size={25} />
          </div>
          <div className="col-4">
            <p style={{ color: "white", fontFamily: "Almarai" }}>
              {props.pedido.client?.name}
            </p>
          </div>
          <div className="col">
            <MdPlace color="white" size={25} />
          </div>
          <div className="col-4">
            <p style={{ color: "white", fontFamily: "Almarai" }}>
              {props.pedido.city}
            </p>
          </div>
        </div>
        <div className="row justify-content-around mt-2">
          <div className="col">
            <FaMoneyBillAlt color="white" size={25} />
          </div>
          <div className="col-4">
            <p style={{ color: "white", fontFamily: "Almarai" }}>
              {numberToReal(props.pedido.total)}
            </p>
          </div>
          <div className="col">
            <BsFillClockFill color="white" size={25} />
          </div>
          <div className="col-4">
            <p style={{ color: "white", fontFamily: "Almarai" }}>
              {dateToHours(props.pedido?.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PedidoCard;
