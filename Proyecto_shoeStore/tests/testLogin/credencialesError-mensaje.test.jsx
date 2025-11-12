import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Login from "../../src/Paginas/Login/login.jsx";
import { BrowserRouter } from "react-router-dom";


test ("Credenciales incorrectas + mensaje error", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({error: "Credenciales incorrectas"})
    })
  );

    render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  //son los datos que se van a ingresar
    await userEvent.type(screen.getByPlaceholderText("Ingresa tu correo"), "quispeaguilar.bel3n@gmail");
    await userEvent.type(screen.getByPlaceholderText("Contraseña"),  "soyaye");

    await userEvent.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));

    await waitFor(() =>
    expect(screen.getByText(/Error: Credenciales incorrectas/i)).toBeInTheDocument()
);
});