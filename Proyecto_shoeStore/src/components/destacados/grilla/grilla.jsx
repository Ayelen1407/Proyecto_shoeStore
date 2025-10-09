import React from 'react';
import './grilla.css'; 

const products = [
  { id: 1, name: 'Samba OG', marca: 'Adidas', image: 'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/3bbecbdf584e40398446a8bf0117cf62_9366/Zapatillas_Samba_OG_Blanco_B75806_01_00_standard.jpg', price: '$160.000' },
  { id: 2, name: 'Amplimove', marca: 'Adidas', image: 'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/c8d5b05212c245408df30ce9075a437c_9366/Zapatillas_de_Entrenamiento_Amplimove_Blanco_JR9298_01_00_standard.jpg', price: '$100.000' },
  { id: 3, name: 'MC trainer', marca: 'Nike', image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rebelsport.com.au%2Fdw%2Fimage%2Fv2%2FBBRV_PRD%2Fon%2Fdemandware.static%2F-%2FSites-srg-internal-master-catalog%2Fdefault%2Fdwf095524e%2Fimages%2F68503501%2FRebel_68503501_blackwhite_hi-res.jpg%3Fsw%3D1000%26sh%3D1000%26sm%3Dfit%26q%3D70&f=1&nofb=1&ipt=cdbe33beecbca1d067422d3c7339f93827faa4abdc5d66f61b02e2914d32d525', price: '$120.000' },
  { id: 4, name: 'Dunk low retro', marca: 'Nike', image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsneakerbaker.com%2Fwp-content%2Fuploads%2F2021%2F11%2FNike-Dunk-Low-Retro-White-Black-2021-3.jpg&f=1&nofb=1&ipt=4caadcb2b5d4646411e5ee69a676b6f41575fa7491ce2683fd9fc14b5f2e7005', price: '$160.000' },
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
