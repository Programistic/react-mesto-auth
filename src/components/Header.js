import headerLogo from '../images/logo-white.svg';
import Navbar from './Navbar';

function Header({loggedIn, email, buttonText}) {

  return (
    <header className="header">
      <img className="logo" src={headerLogo} alt="Логотип Mesto"/>
      {loggedIn && <Navbar email={email} buttonText={buttonText} />}
    </header>
  );
}

export default Header;
