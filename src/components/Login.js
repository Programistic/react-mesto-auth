import { useState } from 'react';

function Login({handleLoginSubmit}) {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userEmail || !userPassword) {
      return;
    }
    handleLoginSubmit(userEmail, userPassword);
  }

  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setUserPassword(event.target.value);
  }

  return (
    <div className="entry-screen">
      <h2 className="entry-screen__heading">Вход</h2>
      <form className="form" onSubmit={handleSubmit}>
        <fieldset className="form__fieldset form__fieldset_location_entry-screen">
          <div className="form__field">
            <input id="user-email-input" className="form__input form__input_theme_black" type="email" name="user-email" value={userEmail || ''} onChange={handleEmailChange} placeholder="Email" required />
            <span className="form__input-error user-email-input-error"></span>
          </div>
          <div className="form__field">
            <input id="user-password-input" className="form__input form__input_theme_black" type="password" name="user-password" value={userPassword || ''} onChange={handlePasswordChange} placeholder="Пароль" required />
            <span className="form__input-error user-password-input-error"></span>
          </div>
        </fieldset>
        <button className="form__submit form__submit_theme_white button" type="submit" aria-label='Войти'>Войти</button>
      </form>
    </div>
  );
}

export default Login;