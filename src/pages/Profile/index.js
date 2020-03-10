import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from './styles';
import { Form, Input } from '@rocketseat/unform';

export default function Profile() {
  const profile = useSelector(state => state.user.profileUser);

  return (
    <Container>
      <Form initialData={profile}>
        <Input name="name" placeholder="Nome Completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />

        <hr />
        <Input
          name="oldPassword"
          type="password"
          placeholder="Sua senha atual"
        />
        <Input name="password" type="password" placeholder="Sua nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirme sua nova senha"
        />

        <button type="submit">Atualizar perfil</button>
      </Form>

      <button type="button">Sair</button>
    </Container>
  );
}
