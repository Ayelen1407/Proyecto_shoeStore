import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../src/Paginas/Login/login.jsx';

describe('Login Component', () => {
  test("si hay inputs vacios no se puede logear", async () => {
    global.fetch = jest.fn();

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    //Los inputs están vacios por defecto
    const emailInput = screen.getByPlaceholderText("Ingresa tu correo");
    const passwordInput = screen.getByPlaceholderText("Contraseña");
    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');

    const submitButton = screen.getByRole("button", { name: /Iniciar Sesión/i });

    await userEvent.click(submitButton); //clickeamos boton

    //Fetch no se llama
    expect(global.fetch).not.toHaveBeenCalled();

    //Como no se envio, el mensaje "Login exitoso ¡Bienvenido!" no debe aparecer
    expect(screen.queryByText(/Login exitoso ¡Bienvenido!/)).not.toBeInTheDocument();
  });
});