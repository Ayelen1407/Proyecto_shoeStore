import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";

// Mock del contexto del carrito (para que no rompa)
jest.mock("../cartContext.jsx", () => ({
  useCart: () => ({
    productosCarrito: [],
    agregarAlCarrito: jest.fn(),
    removerDelCarrito: jest.fn(),
    actualizarCantidad: jest.fn(),
  }),
}));

// mockea productos falsos para no afectar o depender de mi api('/api/shoes')
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          { id: 1, name: "Nike Air Max", brand: "Nike", price: 150000, image: "nike.png" },
          { id: 2, name: "Adidas Superstar", brand: "Adidas", price: 120000, image: "adidas.png" },
        ]),
    })
  );
});

test("el buscador filtra productos por el texto ingresado", async () => {
  render( //reenderizo elheader 
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  // Esperar a que los productos del fetch se carguen
  await waitFor(() => { //espera hasta que el Header termine de llamar a fetch
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  const input = screen.getByPlaceholderText("Buscar..."); //busco el input del navegador

  fireEvent.change(input, { target: { value: "nike" } });  // simula que el usuario escribe algo

  expect(await screen.findByText("Nike Air Max")).toBeInTheDocument(); //verificamos que el resultado aparece

  expect(screen.queryByText("Adidas Superstar")).toBeNull();
}); // verificamos que los shoes que no coinciden no aparezcan



test("si el usuario borra el texto, no se muestran resultados", async () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  //esperar fetch
  await waitFor(() => expect(fetch).toHaveBeenCalled());

  const input = screen.getByPlaceholderText("Buscar...");

 
  fireEvent.change(input, { target: { value: "nike" } }); //escribo algo
  expect(await screen.findByText("Nike Air Max")).toBeInTheDocument();


  fireEvent.change(input, { target: { value: "" } });  // lo borro


  expect(screen.queryByText("Nike Air Max")).toBeNull(); //verficamos que no haya resultado resultados
});
  // probar este test