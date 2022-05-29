import React from 'react';

function Navbar() {

  const email = "maksim.dav@mail.ru";
  const buttonText = "Выйти";

  return (
    <nav className="menu">
      <span className="menu__user-email">{email}</span>
      <button className="menu__nav-button button">{buttonText}</button>
    </nav>
  );
}

export default Navbar;