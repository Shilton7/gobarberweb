import React, { useState, useMemo, useEffect } from 'react';
import { Container, Time } from './styles';
import {
  MdChevronLeft,
  MdChevronRight,
  MdDoNotDisturb,
  MdCheck,
  MdPersonOutline,
} from 'react-icons/md';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  isEqual,
  parseISO,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import api from '~/services/api';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

export default function Dashboard() {
  const [dateAtual, setDate] = useState(new Date());
  const [schedule, setSchedule] = useState([]);
  const timezoneUser = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const dateFormatted = useMemo(
    () => format(dateAtual, "d 'de' MMMM", { locale: pt }),
    [dateAtual]
  );

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('schedule', {
        params: { date: dateAtual },
      });

      const data = range.map(hour => {
        const checkDate = setSeconds(
          setMinutes(setHours(dateAtual, hour), 0),
          0
        );
        const compareDate = utcToZonedTime(checkDate, timezoneUser);

        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find(
            a => parseISO(a.date).toString() === compareDate.toString()
          ),
        };
      });
      setSchedule(data);
    }
    loadSchedule();
  }, [dateAtual]);

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
        {schedule.map(time => (
          <Time key={time.time} past={time.past} available={!time.appointment}>
            <strong>{time.time}</strong>
            {time.past && !time.appointment && (
              <MdDoNotDisturb className="icon_time" size="30" color="red" />
            )}

            {time.past && time.appointment && (
              <MdPersonOutline className="icon_time" size="30" color="green" />
            )}

            {!time.past && !time.appointment && (
              <MdCheck className="icon_time" size="30" color="green" />
            )}

            <span>
              {time.appointment ? time.appointment.user.name : 'Horário Livre'}
            </span>
          </Time>
        ))}
      </ul>
    </Container>
  );
}
