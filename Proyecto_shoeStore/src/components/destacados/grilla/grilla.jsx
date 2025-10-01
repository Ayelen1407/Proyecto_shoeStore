import React from 'react';
import './grilla.css'; 

const products = [
  { id: 1, name: 'Samba OG', marca: 'Adidas', image: 'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/3bbecbdf584e40398446a8bf0117cf62_9366/Zapatillas_Samba_OG_Blanco_B75806_01_00_standard.jpg', price: '$160.000' },
  { id: 2, name: 'Amplimove', marca: 'Adidas', image: 'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/c8d5b05212c245408df30ce9075a437c_9366/Zapatillas_de_Entrenamiento_Amplimove_Blanco_JR9298_01_00_standard.jpg', price: '$100.000' },
  { id: 3, name: 'Air Force', marca: 'Nike', image: 'https://nikearprod.vtexassets.com/arquivos/ids/163455-800-800?width=800&height=800&aspect=true', price: '$200.000' },
  { id: 4, name: 'Legend Essential', marca: 'Nike', image: 'https://nikearprod.vtexassets.com/arquivos/ids/501786-800-800?width=800&height=800&aspect=true', price: '$120.000' },
];

const Grilla = () => {
  return (
    <div className="grid-container">
      {products.map((product) => (
        <div key={product.id} className="grid-item">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <h4>{product.marca}</h4>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Grilla;
