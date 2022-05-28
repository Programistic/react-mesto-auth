import React from 'react';

function InfoTooltip({isOpen, onClose}) {

  const popupOpened = isOpen ? 'popup_opened' : '';
  const message = "Вы успешно зарегистрировались!";
  const message2 = "Что-то пошло не так! Попробуйте ещё раз.";
  const buttonName = "fail"
  isOpen = true;

  return (
    <div className={`popup popup_role_tooltip ${popupOpened}`}>
      <div className="popup__container">
        <button className={`popup__button-confirm popup__button-${buttonName}`}></button>
        <h2 className="popup__message">{message2}</h2> 
      </div>
      <button className="button popup__button-close" type="button" aria-label="Закрыть" onClick={onClose}></button>
    </div>
  );
}

export default InfoTooltip;