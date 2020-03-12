import React from 'react';
import { Container, Content, Profile } from './styles';
import logo from '~/assets/img/logo_purple.svg';
import { Link } from 'react-router-dom';
import Notifications from '~/components/Notifications';
import { useSelector } from 'react-redux';

export default function Header() {
  //Dados profile redux
  const dadosUser = useSelector(state => state.user.profileUser);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="logo_header" />
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{dadosUser.name}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img
              src={
                dadosUser.avatar.url ||
                'https://api.adorable.io/avatars/40/abott@adorable.png'
              }
              alt="logo_perfil"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
