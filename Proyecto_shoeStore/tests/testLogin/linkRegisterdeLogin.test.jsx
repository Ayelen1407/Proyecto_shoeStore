import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Login from "../../src/Paginas/Login/login.jsx";

// Mock global de useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

  test("El link 'Regístrate' redirige a /register", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const link = screen.getByText(/Regístrate/i);

    await user.click(link);

    expect(mockNavigate).toHaveBeenCalledWith("/register");
    expect(mockNavigate).toHaveBeenCalledTimes(1);  //Verifica que se llame solo una vez
  });