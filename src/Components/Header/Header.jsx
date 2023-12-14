import React from 'react'
import './Header.scss'
import eye from '../../img/icons/eye.svg'
import hideEye from '../../img/icons/hideEye.svg'
import HeaderLogo from "../../img/icons/logo.svg";
import { Link, NavLink } from 'react-router-dom';
import { Auth } from '../../Context/Context';
import Modal from '../Modal/Modal';
import firebase from 'firebase/app';
import 'firebase/auth';

export const Header = () => {
  const [modal, setModal] = React.useState(false)
  const [submitObj, setSubmitObj] = React.useState({
    email: '',
    password: ''
  })
  const {isAuth, setIsAuth} = React.useContext(Auth)
  const [remember, setRemember] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  
  React.useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyDO-e8ZFVEzA12XusFQq1FsnUs6yEB0eGc",
      authDomain: "dimpom-4d9fe.firebaseapp.com",
      projectId: "dimpom-4d9fe",
      storageBucket: "dimpom-4d9fe.appspot.com",
      messagingSenderId: "213650717391",
      appId: "1:213650717391:web:f90b88e48105a3d96b95ba",

      databaseURL: "https://dimpom-4d9fe-default-rtdb.firebaseio.com",
      measurementId: "G-C5GYKMLBBL"
    };
    
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);
  
  function NavActive() {
    let iconHeader = document.querySelector('.header__icon')
    let navMenu = document.querySelector('.header__nav')

    iconHeader.classList.toggle('_active')
    navMenu.classList.toggle('_active')
    document.body.classList.toggle("_lock")
  }

  function openModal() {
    if (isAuth) {
      let sureSignOut = window.confirm('Вы точно хотите выйти')
      if (sureSignOut) {
        firebase.auth().signOut()
        .then(() => {
          localStorage.removeItem('authIs')
          setIsAuth(false)
        })
      }
    } else {
      setModal(true)
    }
  }
  
  function signIn() {
    firebase.auth().signInWithEmailAndPassword(submitObj.email, submitObj.password)
    .then(() => {
      if (remember) {
        localStorage.setItem('authIs', true)
      }
      setIsAuth(true)
      setModal(false)
    })
    .catch(() => {
      alert('Не правильный логин или пароль')
    });
  }
  
  return (
    <>
      <header className='header'>
        <div className="header__shell container">
          <Link to='/' className="header__logo">
            <img src={HeaderLogo} alt="logo" />
            <span>Союз <br /> Писателей </span>
          </Link>
          <div className="header__phone">
            <a href="tel:+79994934526">+7 (906) 488-87-74</a>
          </div>
          <div className='nav-login'>
            <div onClick={NavActive} className="header__icon">
              <span></span>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-link">
                <li className="header__nav-item">
                  <NavLink to="/" className="header__nav-link">Главная</NavLink>
                </li>
                <li className="header__nav-item">
                  <NavLink to="documents" className="header__nav-link">Документы</NavLink>
                </li>
                <li className="header__nav-item">
                  <NavLink to="writers" className="header__nav-link">Писатели</NavLink>
                </li>
                <li className="header__nav-item">
                  <NavLink to="writers-works" className="header__nav-link">Творчество</NavLink>
                </li>
              </ul>
            </nav>
            <div onClick={openModal} className="login">
              {
                isAuth ? <>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17L21 12L16 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </> : <>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 10H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 5L7 10L12 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              }

              <span>{isAuth ? 'Выйти' : 'Войти'}</span>
            </div>
          </div>
        </div>
      </header>
      {modal && <Modal setModal={setModal}>
        <div className="form">
          <input onChange={e => setSubmitObj({...submitObj, email: e.target.value})} className='input email' type="text" name='email' placeholder='Эл. почта' />
          <label className='passwordLabel' htmlFor="">
            <input onChange={e => setSubmitObj({...submitObj, password: e.target.value})} id='password' className='input password' type={showPassword ? "password" : 'text'} name='password' placeholder='Пароль' />
            <img onClick={() => setShowPassword(!showPassword)} src={showPassword ? eye : hideEye } alt="eye" />
          </label>
          <label className='remember-me' htmlFor="rememberMe">
            <input onChange={e => setRemember(e.target.value)} checked={remember} type="checkbox" id='rememberMe' />
            Запомнить меня
          </label>
          <button onClick={signIn} className='submit_btn'>Войти</button>
        </div>
      </Modal>}
    </>
  )
}

export default Header