import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Register from "../../src/Paginas/Register/Register.jsx";
import { BrowserRouter } from "react-router-dom";

test ("Muestra error si el correo ya esta registrado", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ error: "El correo ya está registrado" }),
    })
  );

    render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

    //datos a ingresar que ya estan registrados (simulación de interacción)
    await userEvent.type(screen.getByPlaceholderText("Ingresa tu correo"), "quispeaguilar.bel3n@gmail.com");
    await userEvent.type(screen.getByPlaceholderText("Ingresa tu contraseña"),  "yosoyaye");
    await userEvent.type(screen.getByPlaceholderText("Ingresa tu nombre de usuario"), "Ayelen");
    //simula el click en el boton
    await userEvent.click(screen.getByRole("button", { name: /Registrarse/i }));

    await waitFor(() => {
  expect(screen.getByText(/El correo ya está registrado/i)).toBeInTheDocument();
});
});