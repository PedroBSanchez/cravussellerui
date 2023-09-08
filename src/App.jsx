import { BrowserRouter, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./screens/Login";
import Pedidos from "./screens/Pedidos";

import "./App.css";
import Dia from "./screens/Dia";
import Clients from "./screens/Clients";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Login />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/dia" element={<Dia />} />
        <Route path="/clientes" element={<Clients />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
