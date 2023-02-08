import React from "react";

import { FaTrashAlt } from "react-icons/fa";

import "./TableNewOrder.css";

const TableNewOrder = ({ orderItems, handleRemoveItem }) => {
  return (
    <div className="table-container">
      <table
        className="table table-warning table-striped"
        style={{ borderRadius: 15 }}
      >
        <thead>
          <tr>
            <th scope="col" className="table-item">
              #
            </th>
            <th scope="col" className="table-item">
              Descrição
            </th>
            <th scope="col" className="table-item">
              Preço
            </th>
            <th scope="col" className="table-item">
              Quantidade
            </th>
            <th scope="col" className="table-item">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {orderItems &&
            orderItems.map((item, index) => {
              return (
                <tr key={index}>
                  <th className="table-item">
                    <u>{item.code}</u>
                  </th>
                  <th className="table-item">{item.description}</th>
                  <th className="table-item">R${item.value.toFixed(2)}</th>
                  <th className="table-item">{item.amount}</th>
                  <th className="table-item">
                    <FaTrashAlt
                      color="#eb6767"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleRemoveItem(index);
                      }}
                    />
                  </th>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TableNewOrder;
