import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Login from "../../src/Paginas/Login/login.jsx";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Redirección a pagina principal tras login exitoso", () => {
  jest.setTimeout(10000);

  beforeEach(() => {
      jest.clearAllMocks();
      jest.useRealTimers(); // simula temporizadores reales
  });

  afterEach(() => {
    jest.useRealTimers(); // vuelve a la normalidad
    jest.restoreAllMocks(); // para limpiar los mocks despues de casa test
});

    test("llama a navigate('/') tras login exitoso", async () => {

      global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                message: "Login exitoso ¡Bienvenido!",
                user_name: "Ayelen",
                user_email: "quispeaguilar.bel3n@gmail.com",
                token: "nosequetokenfalsoingresar"
             }),
    })
    );
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    //son los datos que se van a ingresar 
    await userEvent.type(screen.getByPlaceholderText("Ingresa tu correo"), "quispeaguilar.bel3n@gmail.com");
    await userEvent.type(screen.getByPlaceholderText("Contraseña"), "yosoyaye");
    await userEvent.click(screen.getByRole("button", { name: /Iniciar Sesión/i }));

    await waitFor(() =>
      expect(screen.getByText(/Login exitoso ¡Bienvenido!/i)).toBeInTheDocument()//se espera que el mensaje aparezca en pamtalla
    );

    await new Promise((r) => setTimeout(r, 2100)); //espera por el timeout de 2s en mi componente

    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith("/"); //redirige si pasa todo bien
    });
  });
});