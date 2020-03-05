import React from 'react';
import { Container, Content, Profile } from './styles';
import logo from '~/assets/img/logo_purple.svg';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="logo_header" />
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>Shilton</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img
              src="https://api.adorable.io/avatars/50/abott@adorable.pngCopy to Clipboard"
              alt="logo_perfil"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
