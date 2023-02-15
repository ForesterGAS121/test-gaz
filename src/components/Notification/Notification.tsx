import React, { useEffect } from 'react';
import { notification } from 'antd';
import { useSelector } from 'react-redux';
import { StoreType } from '../../redux/reducer.typing';
import dayjs from 'dayjs';

const Notification = () => {
  const [api, contextHolder] = notification.useNotification();
  const listToday = useSelector((store: StoreType) => store.events[dayjs(new Date()).format('YYYY-MM-DD')] || []);
  const [stateObject, updateState] = React.useState<object>({});
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const listNotifications = listToday.reduce((acc: Record<string, string[]>, event) => {
    const notification = dayjs(event.notification).valueOf();
    const start = dayjs(event.start).valueOf();
    if (notification >= Date.now()) {
      acc[notification] = [
        ...(acc[notification] || []),
        `У вас запланировано ${event.title} с ${dayjs(event.start).format('hh:mm')} до ${dayjs(event.end).format(
          'hh:mm',
        )}`,
      ];
    }
    if (notification === start) return acc;
    if (start >= Date.now()) {
      acc[start] = [
        ...(acc[start] || []),
        `У вас началось ${event.title} и продлится до ${dayjs(event.end).format('hh:mm')}`,
      ];
    }
    return acc;
  }, {});

  useEffect(() => {
    const aKeys = Object.keys(listNotifications).map((el) => +el);
    let timerID: NodeJS.Timeout;
    if (listNotifications[Math.min(...aKeys)]) {
      timerID = setTimeout(
        () => openNotification(listNotifications[Math.min(...aKeys)]),
        Math.min(...aKeys) - Date.now(),
      );
    }
    return () => {
      if (timerID) clearTimeout(timerID);
    };
  }, [stateObject, listToday]);

  const openNotification = (events: string[]) => {
    events.forEach((event) => {
      api.info({
        message: 'Напоминание',
        description: <div>{event}</div>,
        placement: 'topRight',
        duration: 10,
      });
    });
    forceUpdate();
  };
  return <>{contextHolder}</>;
};
export default Notification;
