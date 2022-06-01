import headerLogo from '../images/logo-white.svg';
import Menu from './Menu';

function Header({userEmail, resetLogedIn}) {

  return (
    <header className="header">
      <img className="logo" src={headerLogo} alt="Логотип Mesto"/>
      <Menu userEmail={userEmail} resetLogedIn={resetLogedIn} />
    </header>
  );
}

export default Header;
