import "./footer.css";
import React from 'react';
import { AiOutlineWhatsApp } from "react-icons/ai";
import { FiInstagram } from "react-icons/fi";
import { CgMail } from "react-icons/cg";

const Footer = () => {
  return (
    <footer className="footerContainer" >
      <div className="categoria">
         <h1 className="footer-1 ">CATEGORIAS</h1>
         <a href="" className="footer-2">Basicas</a>
         <a href="" className="footer-2">Deportivas</a>
         <a href="" className="footer-2">High-Top</a>
         <a href="" className="footer-2">Basicas</a>
      </div>
      <div className="contactanos">
         <h1 className="footer-1 ">CONTACTANOS</h1>
         <a href="" className="footer-2"><AiOutlineWhatsApp/> numero:1161929792</a>
         <a href="" className="footer-2"><CgMail/> email: shoeStore@gmail.com</a>
         <a href="" className="footer-2"><FiInstagram/> instagram: shoe_store</a>
         <button className="footer-2 "></button>
      </div>
    </footer>
  );
}


export default Footer ;


/*
<h2 className = "footer-h2">CATEGORIAS</h2>
                <button>
                <AiOutlineWhatsApp /> 
                </button>
                <p>
                <AiOutlineWhatsApp /> Categorias
                </p> 
                
*/