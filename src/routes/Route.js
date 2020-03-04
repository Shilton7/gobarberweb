import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import AuthLayout from '~/pages/_layouts/auth';
import Defaultlayout from '~/pages/_layouts/default';
import store from '~/store/';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  //valida se usuario está logado via reducer
  const { signed } = store.getState().auth;

  //não logado acessando rota privada
  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  //logado
  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  //validação de layout css
  const LayoutPage = signed ? Defaultlayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <LayoutPage>
          <Component {...props} />
        </LayoutPage>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
