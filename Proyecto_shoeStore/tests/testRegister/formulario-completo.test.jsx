import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Register from "../../src/Paginas/Register/Register.jsx";
import { BrowserRouter } from "react-router-dom";

test("verificación de elementos existentes en el formulario Register", () => {
  render(
  <BrowserRouter>
    <Register />
  </BrowserRouter>
  );
  
  expect(screen.getByText("Regístrate")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Ingresa tu correo")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Ingresa tu contraseña")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Ingresa tu nombre de usuario")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Registrarse/i })).toBeInTheDocument();
});
