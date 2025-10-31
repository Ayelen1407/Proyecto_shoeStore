import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Register from "../src/Paginas/Register/Register.jsx";
import { BrowserRouter } from "react-router-dom";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Redirección despues de registrarte correctamente", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("llama a navigate('/login') tras un registro exitoso", async () => {
        global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ message: "Usuario creado", user_id: 101 }),
    })
    );
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    //son los datos que se van a ingresar
    await userEvent.type(screen.getByPlaceholderText("Ingresa tu correo"), "evelynvillareal@gmail.com");
    await userEvent.type(screen.getByPlaceholderText("Ingresa tu contraseña"), "yosoyeve");
    await userEvent.type(screen.getByPlaceholderText("Ingresa tu nombre de usuario"), "Evelyn");
    await userEvent.click(screen.getByRole("button", { name: /Registrarse/i }));

    await waitFor(() =>
        expect(screen.getByText(/usuario creado/i)).toBeInTheDocument()
    );

    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/login"); //redirige si pasa todo bien
    });
  });
});