import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import swal from "sweetalert";

import ModalLoading from "../components/ModalLoading";

import "./Login.css";
import { verifyLogin } from "../utils/verifyLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const navigateHome = async () => {
    //Validar campos
    if (!validFields()) {
      return swal({
        title: "Campos inválidos",
        icon: "warning",
        dangerMode: true,
      });
    }

    setLoading(true);

    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/users/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("tokenApi", response.data.token);
        navigate("/pedidos");

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        swal({
          title: "Falha ao realizar login",
          icon: "warning",
          dangerMode: true,
        });
        console.log(error);
      });
  };

  useEffect(async () => {
    // const loginValid = await verifyLogin();
    // if (loginValid) {
    //   navigate("/pedidos");
    // }
  }, []);

  const validFields = () => {
    if (email == "" || email == null || password == "" || password == null) {
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row text-center mt-5">
          <h2 className="login-title ">Cravus</h2>
        </div>
        <div className="login-card p-4">
          <div className="row">
            <div className="col">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="row mt-2">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="row mt-4">
            <Button variant="success" onClick={navigateHome}>
              Entrar
            </Button>
          </div>
        </div>
      </div>

      <ModalLoading
        show={loading}
        onHide={() => {
          setLoading(false);
        }}
      />
    </>
  );
};

export default Login;
