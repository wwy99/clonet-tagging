import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserAuthentication.css';

function SignUp({ onSignUpSuccess }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [wechatName, setWechatName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError('');

    // Validate phone number
    if (phoneNumber.length !== 11) {
      setError(t('signUp.phoneValidationError'));
      return;
    }

    try {
      const response = await axios.post('/api/signup', {
        wechatName,
        phoneNumber,
        password,
      });

      if (response.status === 201) {
        onSignUpSuccess(wechatName); // Pass the wechatName to onSignUpSuccess
        navigate('/user-center'); // Redirect to user center page
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(t('signUp.registrationError'));
    }
  };

  return (
    <div>
      <div className="form-container">
        <h2>{t('signUp.title')}</h2>
        <form onSubmit={handleSignUp}>
          <label>
            {t('signUp.wechatName')}:
            <input type="text" value={wechatName} onChange={(e) => setWechatName(e.target.value)} />
          </label>
          <label>
            {t('signUp.phoneNumber')}:
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </label>
          <label>
            {t('signUp.password')}:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit">{t('signUp.button')}</button>
          <p>
            {t('signUp.haveAccount')} <button type="button" onClick={() => navigate('/login')}>{t('login.title')}</button>
          </p>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

function Login({ onLoginSuccess }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/login', {
        phoneNumber,
        password,
      });

      if (response.status === 200) {
        onLoginSuccess();
        navigate('/user-center'); // Redirect to user center page
      } else {
        setError(t('login.invalidCredentialsError'));
      }
    } catch (error) {
      setError(t('login.loginError'));
    }
  };

  return (
    <div>
      <div className="form-container">
        <h2>{t('login.title')}</h2>
        <form onSubmit={handleLogin}>
          <label>
            {t('login.phoneNumber')}:
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </label>
          <label>
            {t('login.password')}:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit">{t('login.button')}</button>
          <p>
            {t('login.newUser')} <button type="button" onClick={() => navigate('/signup')}>{t('signUp.title')}</button>
          </p>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

function UserAuthentication({ onAuthentication, signUp }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleAuthentication = () => {
    onAuthentication();
    navigate('/user-center');
  };

  return (
    <div className="auth-container">
      <div className="header">衣网数据标注系统</div>
      <div className="auth-form">
        {signUp ? (
          <SignUp onSignUpSuccess={handleAuthentication} />
        ) : (
          <Login onLoginSuccess={handleAuthentication} />
        )}
      </div>
    </div>
  );
}

export default UserAuthentication;
