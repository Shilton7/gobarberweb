import React, { useState, useEffect, useMemo } from 'react';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '~/services/api';
import { MdNotifications } from 'react-icons/md';
import {
  Container,
  Badge,
  NotificationList,
  Notification,
  Scroll,
} from './styles';

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  //valida Badges
  const hasUnread = useMemo(
    () => !!notifications.find(notification => notification.read === false),
    [notifications]
  );

  //created
  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('notifications');
      const data = response.data.map(notification => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt), //data agendamento
          new Date(), //qual data quero calcular a distancia
          {
            addSuffix: true,
            locale: pt,
          } //inclui há  x dias atras
        ),
      }));
      setNotifications(data);
    }
    loadNotifications();
  }, []);

  //click icon Badge
  function handleToggleVisible() {
    setVisible(!visible);
  }

  //marcar como lida ou não
  async function handleMarkAsRead(id) {
    await api.put(`notifications/${id}?read=1`);

    //atualizando a listagem do Badge deixando a notificação x lida
    setNotifications(
      notifications.map(notification =>
        notification._id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} BadgeNaoLidas={hasUnread}>
        <MdNotifications color="#7159c1" size={20} />
      </Badge>

      <NotificationList show={visible}>
        <Scroll>
          {notifications.map(notification => (
            <Notification
              key={notification._id}
              NotificationNaoLida={!notification.read}
            >
              <p> {notification.content}</p>
              <time> {notification.timeDistance}</time>
              {!notification.read && (
                <button
                  type="button"
                  onClick={() => handleMarkAsRead(notification._id)}
                >
                  Marcar como lida
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
