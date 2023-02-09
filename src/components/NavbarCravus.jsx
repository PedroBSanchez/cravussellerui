import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import sewingMachineImage from "../assets/sewing.png";

import "./NavbarCravus.css";

const NavbarCravus = () => {
  const navigate = useNavigate();
  const handleNavigate = (pageUrl) => {
    navigate(`/${pageUrl}`);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <img
              src={sewingMachineImage}
              alt="Bootstrap"
              width="35"
              height="35"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                handleNavigate("pedidos");
              }}
            >
              Venda
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                handleNavigate("dia");
              }}
            >
              Pedidos
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarCravus;
