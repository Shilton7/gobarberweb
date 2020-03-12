import React, { useState, useMemo } from 'react';
import { Container, Time } from './styles';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

export default function Dashboard() {
  const [dateAtual, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(dateAtual, "d 'de' MMMM", { locale: pt }),
    [dateAtual]
  );

  //prev day
  function handlePrevDay() {
    setDate(subDays(dateAtual, 1));
  }

  //next day
  function handleNextDay() {
    setDate(addDays(dateAtual, 1));
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft size="36" color="#FFF" />
        </button>

        <strong> {dateFormatted} </strong>

        <button type="button" onClick={handleNextDay}>
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
