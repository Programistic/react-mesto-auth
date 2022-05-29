import headerLogo from '../images/logo-white.svg';
import Navbar from './Navbar';

function Header({loggedIn}) {

  return (
    <header className="header">
      <img className="logo" src={headerLogo} alt="Логотип Mesto"/>
      {loggedIn && <Navbar />}
    </header>
  );
}

export default Header;
