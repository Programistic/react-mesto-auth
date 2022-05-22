import headerLogo from '../images/logo-white.svg';

function Header() {

  return (
    <header className="header">
      <img className="logo" src={headerLogo} alt="Логотип Mesto"/>
    </header>
  );
}

export default Header;
