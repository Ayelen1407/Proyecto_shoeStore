import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Register from "../../src/Paginas/Register/Register.jsx";
import { BrowserRouter } from "react-router-dom";

test ("Muestra mensaje exitoso al registrarse correctamente", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: "Usuario creado. Registro exitoso!", user_id: 101 }),
    })
  );

    render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

  //son los datos que se van a ingresar
    await userEvent.type(screen.getByPlaceholderText("Ingresa tu correo"), "quispeaguilar.bel3n@gmail.com");
    await userEvent.type(screen.getByPlaceholderText("Ingresa tu contraseña"),  "yosoyaye");
    await userEvent.type(screen.getByPlaceholderText("Ingresa tu nombre de usuario"), "Ayelen");

    await userEvent.click(screen.getByRole("button", { name: /Registrarse/i }));

    await waitFor(() =>
    expect(screen.getByText(/Usuario creado. Registro exitoso!/i)).toBeInTheDocument()
  );
});