import headerLogo from '../images/logo-white.svg';

function Header() {

  const email = "maksim.dav@mail.ru";
  const buttonText = "Выйти";

  return (
    <header className="header">
      <img className="logo" src={headerLogo} alt="Логотип Mesto"/>
      <div className="menu">
        <span className="menu__user-email">{email}</span>
        <button className="menu__nav-button button">{buttonText}</button>
      </div>
    </header>
  );
}

export default Header;
