import React from 'react';
import { Container, Time } from './styles';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export default function Dashboard() {
  return (
    <Container>
      <header>
        <button type="button">
          <MdChevronLeft size="36" color="#FFF" />
        </button>

        <strong> 9 de Agosto</strong>

        <button type="button">
          <MdChevronRight size="36" color="#FFF" />
        </button>
      </header>

      <ul>
        <Time past>
          <strong>08:00</strong>
          <span>Letycia</span>
        </Time>

        <Time available>
          <strong>09:00</strong>
          <span>Diego</span>
        </Time>

        <Time>
          <strong>10:00</strong>
          <span>Livre</span>
        </Time>

        <Time>
          <strong>11:00</strong>
          <span>Livre</span>
        </Time>
      </ul>
    </Container>
  );
}
