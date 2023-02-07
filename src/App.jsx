import { BrowserRouter, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./screens/Login";
import Pedidos from "./screens/Pedidos";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pedidos" element={<Pedidos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
