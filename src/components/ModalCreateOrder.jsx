import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import swal from "sweetalert";

import { BsPlusSquareFill } from "react-icons/bs";

import "./ModalCreateOrder.css";
import { Button } from "react-bootstrap";
import TableNewOrder from "./TableNewOrder";
import ModalLoading from "./ModalLoading";

const ModalCreateOrder = (props) => {
  const [loading, setLoading] = useState(false);

  const [newCity, setNewCity] = useState("");
  const [newClient, setNewClient] = useState("");

  const [newItems, setNewItems] = useState([]);

  const [orderPrice, setOrderPrice] = useState(0);

  const [newItemCode, setNewItemCode] = useState();
  const [newItemDescription, setNewItemDescription] = useState();
  const [newItemAmount, setNewItemAmount] = useState();
  const [newItemValue, setNewItemValue] = useState();

  const [allItems, setAllItems] = useState([
    { code: 1, description: "Teste", value: 30.5 },
    { code: 2, description: "Safe", value: 30.5 },
    { code: 3, description: "Xesque", value: 30.5 },
  ]);

  const [allClients, setAllClients] = useState([]);

  const getItemsOrders = async () => {
    const token = localStorage.getItem("tokenApi");
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/items/getall`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAllItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getClients = async () => {
    const token = localStorage.getItem("tokenApi");

    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/clients/getall`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAllClients(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    //Pegar all items
    getItemsOrders();
    getClients();
  }, []);

  const handleAddItem = () => {
    let produtoJaAdicionado = false;
    console.log(newItemCode);
    if (
      !newItemCode ||
      !newItemDescription ||
      !newItemAmount ||
      !newItemValue
    ) {
      return swal({
        icon: "error",
        title: "Campos inválidos",
        showConfirmButton: false,
        timer: 2500,
      });
    }

    //Verificar se produto já foi adicionado

    for (let index = 0; index < newItems.length; index++) {
      if (newItems[index].code == newItemCode) {
        produtoJaAdicionado = true;
      }
    }

    if (produtoJaAdicionado) {
      return swal({
        icon: "error",
        title: "Produto já adicionado",
        showConfirmButton: false,
        timer: 2500,
      });
    }

    setNewItems([
      ...newItems,
      {
        code: newItemCode,
        description: newItemDescription,
        amount: newItemAmount,
        value: newItemValue,
      },
    ]);

    //Zerar valores + campo de produto e quantidade
    setNewItemCode(null);
    setNewItemDescription(null);
    setNewItemValue(null);
    setNewItemAmount(null);

    document.getElementById("produtoInput").value = null;
    document.getElementById("quantidadeInput").value = null;

    setOrderPrice(orderPrice + newItemValue * newItemAmount);
  };

  const handleRemoveItem = (index) => {
    //slice(index, 1)

    setOrderPrice(
      orderPrice - newItems[index].value * parseInt(newItems[index].amount)
    );
    let arrayRemoveItem = newItems;

    arrayRemoveItem.splice(index, 1);

    setNewItems(arrayRemoveItem);
  };

  const handleNewOrder = async () => {
    const token = localStorage.getItem("tokenApi");

    const arrayItems = [];

    if (
      newCity == null ||
      newCity == "" ||
      newClient == null ||
      newClient == "" ||
      newItems.length <= 0
    ) {
      return swal({
        icon: "error",
        title: "Campos obrigatórios",
        showConfirmButton: false,
        timer: 2500,
      });
    }

    const clientObject = JSON.parse(newClient);

    newItems.forEach((element) => {
      arrayItems.push({ code: element.code, amount: parseInt(element.amount) });
    });

    const options = {
      url: `${process.env.REACT_APP_BASE_URL}/api/orders/create`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        city: newCity,
        client: clientObject?._id,
        items: arrayItems,
      },
    };

    setLoading(true);
    await axios
      .request(options)
      .then((response) => {
        //Zerar valores

        zerarInputs();
        props.onHide();
        setLoading(false);
        return swal({
          icon: "success",
          title: "Pedido criado com sucesso",
          showConfirmButton: false,
          timer: 2500,
        });
      })
      .catch((error) => {
        console.log(error);
        zerarInputs();
        props.onHide();
        setLoading(false);
        return swal({
          icon: "error",
          title: "Falha ao criar pedido",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  const zerarInputs = () => {
    setNewCity(null);
    setNewClient(null);
    setNewItems([]);
    setOrderPrice(0);

    setNewItemAmount(null);
    setNewItemCode(null);
    setNewItemDescription(null);
    setNewItemValue(null);

    document.getElementById("cidadeInput").value = null;
    document.getElementById("clienteInput").value = null;
    document.getElementById("produtoInput").value = null;
    document.getElementById("quantidadeInput").value = null;
  };

  const numberToReal = (number) => {
    let numero = number.toFixed(2).split(".");
    numero[0] = "R$" + numero[0].split(/(?=(?:...)*$)/).join(".");
    return numero.join(",");
  };

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
              <Form.Control
                id="cidadeInput"
                type="text"
                onChange={(e) => {
                  setNewCity(e.target.value);
                }}
              />
            </div>
            <div className="col">
              <Form.Label>Cliente</Form.Label>
              <Form.Label>Cliente</Form.Label>
              <Form.Select
                id="clienteInput"
                onChange={(e) => {
                  setNewClient(e.currentTarget.value);
                }}
              >
                <option disabled selected value={null}>
                  Selecione um cliente
                </option>
                {allClients.map((element, index) => {
                  let valueObject = {
                    _id: element?._id,
                    name: element?.name,
                    phone: element?.phone,
                  };
                  return (
                    <option key={index} value={JSON.stringify(valueObject)}>
                      {element?.name}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-8">
              <Form.Label>Produto</Form.Label>
              <Form.Select
                id="produtoInput"
                onChange={(e) => {
                  const objectOption = JSON.parse(e.currentTarget.value);
                  setNewItemCode(objectOption.code);
                  setNewItemDescription(objectOption.description);
                  setNewItemValue(objectOption.value);
                }}
              >
                <option disabled selected>
                  Selecione um produto
                </option>
                {allItems &&
                  allItems.map((item, index) => {
                    let valueObject = {
                      code: item.code,
                      value: item.value,
                      description: item.description,
                    };
                    return (
                      <option key={index} value={JSON.stringify(valueObject)}>
                        {item.code} - {item.description}
                      </option>
                    );
                  })}
              </Form.Select>
            </div>
            <div className="col">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                id="quantidadeInput"
                type="number"
                min={1}
                onChange={(e) => {
                  setNewItemAmount(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="row p-2 mt-4 text-center justify-content-center">
            <Button variant="primary" onClick={handleAddItem}>
              Adicionar Produto
            </Button>
          </div>
          <hr />
          <div className="row mt-2">
            <TableNewOrder
              orderItems={newItems}
              handleRemoveItem={handleRemoveItem}
            />
          </div>
          <div className="row">
            <p>
              Total: <u>{numberToReal(orderPrice)}</u>
            </p>
          </div>
          <div className="row mt-2">
            <Button variant="success" onClick={handleNewOrder}>
              Cadastrar Pedido
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <ModalLoading
        show={loading}
        onHide={() => {
          setLoading(false);
        }}
      />
    </>
  );
};

export default ModalCreateOrder;
