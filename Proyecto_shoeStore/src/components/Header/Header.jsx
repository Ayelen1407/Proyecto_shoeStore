import "./Header.css"

export default function Header() {
  return (
    <header className = "header" >
      <h1 className = "logo">Mi Página</h1>
      <nav>
        <ul className = "lista-nav">
          <li><a href="./login/login.jsx">Sign in</a></li>
          <li><a href="#">Sign up</a></li>
          <li><a href="#">Categorias</a></li>
        </ul>
      </nav>
    </header>
  );
}