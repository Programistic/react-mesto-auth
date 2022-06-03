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
import * as Auth from '../utils/Auth';

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
      userEmail: '',
      selectedCard: {},
      deleteCard: {},
      cards: [],
      currentUser: {},
      loggedIn: false,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.tokenCheck = this.tokenCheck.bind(this);
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
        this.setState({
          cards: this.state.cards.filter(currentCard => currentCard._id !== this.state.deleteCard._id),
          isConfirmPopupOpen: false
        }); 
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

    this.tokenCheck();

    document.addEventListener("keydown", this.handleEscClick);
    document.addEventListener("click", this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEscClick);
    document.addEventListener("click", this.handleOutsideClick);
  }

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isConfirmPopupOpen: false,
      isInfoTooltipOpen: false,
      selectedCard: {}
    });
  }

  openConfirmDeletePopup = (card) => {
    this.setState({
      deleteCard: card,
      isConfirmPopupOpen: true
    });
  }

  handleLogin = () => {
    this.setState({
      loggedIn: true
    });
  }

  resetLoggedIn = () => {
    this.setState({
      loggedIn: false
    })
  }

  handleEmail = (userEmail) => {
    this.setState({
      userEmail: userEmail
    });
  }

  tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      Auth.getContent(jwt)
        .then((res) => {
          if (res) {
            this.setState({
              loggedIn: true,
              userEmail: res.data.email
            }, () => {
              this.props.history.push("/main");
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  handleLoginSubmit = (userEmail, userPassword) => {
    Auth.authorize(userEmail, userPassword)
      .then((data) => {
        if (data !== undefined && data.token) {
          localStorage.setItem('jwt', data.token);
          this.setState({
            loggedIn: true,
            userEmail: userEmail
          });
          this.props.history.push("/main");
        } else {
          return;
        }
      })
      .catch(err => console.log(err));
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

            <Header userEmail={this.state.userEmail} resetLoggedIn={this.resetLoggedIn} />

            <Switch>

              <ProtectedRoute
                exact path="/main"
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
                <Login handleLoginSubmit={this.handleLoginSubmit} />
              </Route>

              <Route path="/signup">
                <Register tooltipSuccess={this.openTooltipSuccess} tooltipFail={this.openTooltipFail} />
              </Route>

              <Route>
                {this.state.loggedIn ? <Redirect to="/main" /> : <Redirect to="/signin" />}
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
            />
            
          </CurrentUserContext.Provider>
          
        </div>
      </div>
    );
  } 
}

export default withRouter(App);

