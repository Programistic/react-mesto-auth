import { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isConfirmPopupOpen: false,
      isInfoTooltipOpen: false,
      infoTooltipButtonName: '',
      infoTooltipMessage: '',
      isSuccess: false,
      selectedCard: {},
      deleteCard: {},
      cards: [],
      currentUser: {},
      loggedIn: false
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin = () => {
    this.setState({ loggedIn: true })
  }

  handleEditProfileClick = () => {
    this.setState({ isEditProfilePopupOpen: true });
  }

  handleAddPlaceClick = () => {
    this.setState({ isAddPlacePopupOpen: true });
  }

  handleEditAvatarClick = () => {
    this.setState({ isEditAvatarPopupOpen: true });
  }

  handleConfirmDeleteCardClick = () => {
    this.setState({ isConfirmPopupOpen: true });
  }

  handleEscClick = (event) => {
    if (event.key === 'Escape') {
      this.closeAllPopups();
    }
  }

  handleOutsideClick = (event) => {
    if (event.target.classList.contains('popup')) {
      this.closeAllPopups();
    }
  }

  handleUpdateUser = (userName, userDescription) => {
    api.setUserInfo(userName, userDescription)
      .then(userData => {
        this.setState({ currentUser: userData });
        this.closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleUpdateAvatar = (userAvatar) => {
    api.setAvatar(userAvatar)
      .then(userData => {
        this.setState({ currentUser: userData });
        this.closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleCardLike = (card) => {

    const isLiked = card.likes.some(like => like._id === this.state.currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then(getCard => {
        this.setState({ cards: this.state.cards.map(oldCard => oldCard._id === getCard._id ? getCard : oldCard) });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleCardDelete = () => {
    api.deleteCard(this.state.deleteCard._id)
      .then(() => {
        this.setState(
          {
            cards: this.state.cards.filter(currentCard => currentCard._id !== this.state.deleteCard._id),
            isConfirmPopupOpen: false
          }
        ); 
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleCardClick = (card) => {
    this.setState({ selectedCard: card });
  }

  handleAddPlace = (placeName, placeImage) => {
    api.setCard(placeName, placeImage)
    .then(newCard => {
      this.setState({ cards: [newCard, ...this.state.cards] });
      this.closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  componentDidMount() {
    api.getUserInfo()
      .then(userData => {
        this.setState({ currentUser: userData });
      })
      .catch((err) => {
        console.log(err);
      });

      api.getCards()
      .then(getCardsArray => {
        this.setState({ cards: getCardsArray });
      })
      .catch(err => {
        console.log(err);
      });

    document.addEventListener("keydown", this.handleEscClick);
    document.addEventListener("click", this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEscClick);
    document.addEventListener("click", this.handleOutsideClick);
  }

  closeAllPopups = () => {
    this.setState(
      {
        isEditProfilePopupOpen: false,
        isAddPlacePopupOpen: false,
        isEditAvatarPopupOpen: false,
        isConfirmPopupOpen: false,
        isInfoTooltipOpen: false,
        selectedCard: {}
      }
    );
  }

  openConfirmDeletePopup = (card) => {
    this.setState({ deleteCard: card, isConfirmPopupOpen: true });
  }

  openTooltipSuccess = () => {
    this.setState({
      isSuccess: true,
      isInfoTooltipOpen: true,
      infoTooltipButtonName: 'success',
      infoTooltipMessage: 'Вы успешно зарегистрировались!'
    });
  }

  openTooltipFail = () => {
    this.setState({
      isSuccess: false,
      isInfoTooltipOpen: true,
      infoTooltipButtonName: 'fail',
      infoTooltipMessage: 'Что-то пошло не так! Попробуйте ещё раз.'
    });
  }

  handleConfirmRegister = () => {
    this.closeAllPopups();
    if(this.state.isSuccess) {
      this.props.history.push('/signin');
    } 
  }

  render() {
    return (
      <div className="page">
        <div className="container">

          <CurrentUserContext.Provider value={this.state.currentUser}>

            <Header loggedIn={this.state.loggedIn} email='maksim@mail.ru' buttonText='Регистрация' />

            <Switch>

              <ProtectedRoute
                path="/main"
                loggedIn={this.state.loggedIn}
                cards={this.state.cards}
                onEditProfile={this.handleEditProfileClick}
                onAddPlace={this.handleAddPlaceClick}
                onEditAvatar={this.handleEditAvatarClick}
                onCardLike={this.handleCardLike}
                onCardDelete={this.openConfirmDeletePopup}
                onCardClick={this.handleCardClick}
                component={Main}>
              </ProtectedRoute>

              <Route path="/signin">
                <Login handleLogin={this.handleLogin} />
              </Route>

              <Route path="/signup">
                <Register tooltipSuccess={this.openTooltipSuccess} tooltipFail={this.openTooltipFail} />
              </Route>

              <Route>
                {this.state.loggedIn ? <Redirect to="/signin" /> : <Redirect to="/signup" />}
              </Route>

            </Switch>

            {this.state.loggedIn && <Footer />}
            

            <EditProfilePopup
              isOpen={this.state.isEditProfilePopupOpen}
              onUpdateUser={this.handleUpdateUser}
              onClose={this.closeAllPopups}
            />

            <EditAvatarPopup
              isOpen={this.state.isEditAvatarPopupOpen}
              onUpdateAvatar={this.handleUpdateAvatar}
              onClose={this.closeAllPopups}
            />

            <AddPlacePopup
              isOpen={this.state.isAddPlacePopupOpen}
              onAddPlace={this.handleAddPlace}
              onClose={this.closeAllPopups}
            />

            <ConfirmDeletePopup
              isOpen={this.state.isConfirmPopupOpen}
              onConfirmDeleteCard={this.handleCardDelete}
              onClose={this.closeAllPopups}
            />

            <ImagePopup
              card={this.state.selectedCard}
              onClose={this.closeAllPopups}
            />

            <InfoTooltip
              isOpen={this.state.isInfoTooltipOpen}
              message={this.state.infoTooltipMessage}
              buttonName={this.state.infoTooltipButtonName}
              onConfirm={this.handleConfirmRegister}
              onClose={this.closeAllPopups}
            />

          </CurrentUserContext.Provider>
          
        </div>
      </div>
    );
  } 
}

export default withRouter(App);

