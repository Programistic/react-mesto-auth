import headerLogo from '../images/logo-white.svg';
import Menu from './Menu';

function Header({userEmail, resetLoggedIn}) {

  return (
    <header className="header">
      <img className="logo" src={headerLogo} alt="Логотип Mesto"/>
      <Menu userEmail={userEmail} resetLoggedIn={resetLoggedIn} />
    </header>
  );
}

export default Header;
