import React, { useState } from "react";
import { FaStore } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { FaMoneyBillAlt } from "react-icons/fa";
import { BsFillClockFill } from "react-icons/bs";
import ModalSendWpp from "./ModalSendWpp";

import "./PedidoCard.css";

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

  return (
    <>
      <div className="pedido-card p-3" onClick={() => setWppModalShow(true)}>
        <div className="row">
          <div className="col">
            <FaStore color="white" size={25} />
          </div>
          <div className="col-4">
            <p style={{ color: "white", fontFamily: "Almarai" }}>
              {props.pedido.client}
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
      <ModalSendWpp
        show={wppModalShow}
        onHide={() => setWppModalShow(false)}
        pedido={props.pedido}
      />
    </>
  );
};

export default PedidoCard;
