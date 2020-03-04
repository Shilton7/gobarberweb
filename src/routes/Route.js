import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import AuthLayout from '~/pages/_layouts/auth';
import Defaultlayout from '~/pages/_layouts/default';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  //usuario está logado ou não
  const signed = false;

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
