import React from 'react';
import logo from '~/assets/img/logo.svg';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

export default function SignUp() {
  function handleSubmit(data) {
    console.tron.log(data);
  }
  return (
    <>
      <img src={logo} alt="logo" />

      <Form onSubmit={handleSubmit}>
        <Input name="name" placeholder="Seu Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
