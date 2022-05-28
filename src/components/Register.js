import React from 'react';
import { useState } from 'react'

function Register() {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleSubmit = () => {

  }

  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setUserPassword(event.target.value);
  }

  const heading = "Регистрация";
  const buttonText = "Зарегистрироваться"

  return (
    <div className="entry-screen">
      <h2 className="entry-screen__heading">{heading}</h2>
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
        <button className="form__submit form__submit_theme_white button" type="submit" aria-label={buttonText}>{buttonText}</button>
      </form>
      <div className="entry-link">
        <span>Уже зарегистрированы?</span>
        <button className="button entry-link__button" aria-label="Войти">Войти</button>
      </div>
    </div>
  );
}

export default Register;