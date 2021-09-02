import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import { createInput, createButton } from '../utils/creators';
import validateEmail from '../utils/validateEmail';
import { PASS_MIN_LENGTH } from '../utils/validationNumbers';
import { emailOptions, passwordOptions } from '../data/InputOptions';
import ErrorMessage from '../components/ErrorMessage';
import { login } from '../services/api';
import { loginButton, registerButton } from '../data/ButtonOptions';
import rockGlass from '../images/rockGlass.svg';
import FormSection from '../components/StyledComponents/FormSection';

const route = 'common_login';

const redirectPath = {
  administrator: <Redirect to="/admin/manage" />,
  seller: <Redirect to="/seller/orders" />,
  customer: <Redirect to="/customer/products" />,
};

function Login() {
  const {
    loginErrorMessage,
    setApiResponse,
    setLoginErrorMessage,
  } = useContext(LoginContext);
  const [state, setState] = useState({ email: '', password: '' });
  const [canRedirect, setCanRedirect] = useState(false);
  const [path, setPath] = useState('');
  // const user = JSON.parse(localStorage.user) || {};

  const handleChange = ({ target: { type, value } }) => {
    setState({ ...state, [type]: value });
  };

  const { email, password } = state;

  const handleLogin = async () => {
    const response = await login(
      email, password, setApiResponse, setLoginErrorMessage,
    );

    if (response.token) {
      localStorage.user = JSON.stringify(response);
      setPath(response.role);
      return setCanRedirect(true);
    }
  };

  // if (user && user.token) return redirectPath[user.role];

  if (canRedirect) return redirectPath[path];

  return (
    <FormSection>
      <object data={ rockGlass } type="image/svg+xml">
        Glass
      </object>
      <h1>LOGIN</h1>
      { createInput({ ...emailOptions, onChange: handleChange, route }) }
      { createInput({ ...passwordOptions, onChange: handleChange, route }) }
      { createButton({
        ...loginButton,
        onClick: handleLogin,
        route,
        disabled: !validateEmail(email)
          || password.length < PASS_MIN_LENGTH,
      })}
      <Link to="/register">
        { createButton({ ...registerButton, onClick: () => {}, route }) }
      </Link>
      { loginErrorMessage && <ErrorMessage route={ route } field="-email" /> }
    </FormSection>
  );
}

/*
user
  adm@deliveryapp.com
  --adm2@21!!--

  fulana@deliveryapp.com
  fulana@123

  zebirita@email.com
  $#zebirita#$
*/

export default Login;
