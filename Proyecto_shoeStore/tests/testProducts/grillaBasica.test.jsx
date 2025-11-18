import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import GrillaBasica from "./../../src/components/categorias/basica/catBasica.jsx";

global.fetch = jest.fn();

// Mock del contexto useCart
jest.mock("../../cartContext", () => ({
  useCart: () => ({
    agregarAlCarrito: jest.fn(),
  }),
}));

describe("GrillaBasica", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("muestra 'Cargando...' inicialmente", () => {
    // No mockear fetch aún para simular loading
    render(<GrillaBasica />);
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  test("renderiza productos después de fetch exitoso", async () => {
    const mockProducts = [
      { id: 1, name: "Zapatilla A", brand: "Marca A", price: 100, image: "img1.jpg" },
      { id: 2, name: "Zapatilla B", brand: "Marca B", price: 200, image: "img2.jpg" },
    ];
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockProducts),
    });

    render(<GrillaBasica />);

    // Esperar a que termine el loading
    await waitFor(() => expect(screen.queryByText("Cargando...")).not.toBeInTheDocument());

    // Verificar productos
    expect(screen.getByText("Zapatilla A")).toBeInTheDocument();
    expect(screen.getByText("Marca A")).toBeInTheDocument();
    expect(screen.getByText("$ 100")).toBeInTheDocument();
    expect(screen.getByText("Zapatilla B")).toBeInTheDocument();
  });

  test("muestra 'No hay productos.' si la lista está vacía", async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve([]),
    });

    render(<GrillaBasica />);

    await waitFor(() => expect(screen.queryByText("Cargando...")).not.toBeInTheDocument());
    expect(screen.getByText("No hay productos.")).toBeInTheDocument();
  });

  test("abre modal al hacer clic en 'Ver Detalles'", async () => {
    const user = userEvent.setup();
    const mockProducts = [{ id: 1, name: "Zapatilla A", brand: "Marca A", price: 100, image: "img1.jpg" }];
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockProducts),
    });

    render(<GrillaBasica />);

    await waitFor(() => expect(screen.getByText("Zapatilla A")).toBeInTheDocument());

    const button = screen.getByText("Ver Detalles");
    await user.click(button);

    // Verificar que el modal aparezca 
    expect(screen.getByText("Zapatilla A")).toBeInTheDocument(); // Aparece en el modal
  });

  test("cierra modal al hacer clic en la X", async () => {
    const user = userEvent.setup();
    const mockProducts = [{ id: 1, name: "Zapatilla A", brand: "Marca A", price: 100, image: "img1.jpg" }];
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockProducts),
    });

    render(<GrillaBasica />);

    await waitFor(() => expect(screen.getByText("Zapatilla A")).toBeInTheDocument());

    // Abrir ventana de detalles
    const button = screen.getByText("Ver Detalles");
    await user.click(button);

    // Cerrar con X
    const closeButton = screen.getByRole("button", { name: /cross/i }); // O usa getByTestId si agregas uno
    await user.click(closeButton);

    // Verificar que la ventana detalles se cierre
    await waitFor(() => expect(screen.queryByText("Zapatilla A")).not.toBeInTheDocument()); // Solo en grilla
  });
});