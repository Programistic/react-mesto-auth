function Navbar({email, buttonText}) {

  return (
    <nav className="menu">
      <span className="menu__user-email">{email}</span>
      <button className="menu__nav-button button">{buttonText}</button>
    </nav>
  );
}

export default Navbar;