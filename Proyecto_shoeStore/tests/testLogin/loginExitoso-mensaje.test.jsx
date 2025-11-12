import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Login from "../../src/Paginas/Login/login.jsx";
import { BrowserRouter } from "react-router-dom";


test ("Login exitoso + mensaje exitoso", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ 
        message: "Login exitoso ¡Bienvenido!",
        user_email : "quispeaguilar.bel3n@gmail.com",
        token: "nosequeotrotokenfalsoingresar"})
    })
  );

    render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  //son los datos que se van a ingresar
    await userEvent.type(screen.getByPlaceholderText("Ingresa tu correo"), "quispeaguilar.bel3n@gmail.com");
    await userEvent.type(screen.getByPlaceholderText("Contraseña"),  "yosoyaye");

    await userEvent.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));

    await waitFor(() =>
    expect(screen.getByText(/Login exitoso ¡Bienvenido!/i)).toBeInTheDocument()
    );
});