import { Route, Switch, Link, useHistory } from 'react-router-dom';

function Menu({userEmail, resetLogedIn}) {

  const history = useHistory();
  const signOut = () => {
    localStorage.removeItem('jwt');
    resetLogedIn();
    history.push("/signin");
  }

  return (
    <nav className="menu">
      <Switch>
        <Route path="/main">
          <p className="menu__user-email">{userEmail}</p>
          <Link to="signin" className="menu__link" onClick={signOut}>Выйти</Link>
        </Route>
        <Route path="/signin">
          <Link to="signup" className="menu__link">Регистрация</Link>
        </Route>
        <Route path="/signup">
          <Link to="signin" className="menu__link">Войти</Link>
        </Route>
      </Switch>
    </nav>
  );
}

export default Menu;