import React from 'react';
import logo from '~/assets/img/logo.svg';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <>
      <img src={logo} alt="logo" />

      <form>
        <input placeholder="Seu Nome completo" />
        <input type="email" placeholder="Seu e-mail" />
        <input type="password" placeholder="Sua senha" />

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login</Link>
      </form>
    </>
  );
}
