import React, { useLayoutEffect, useState } from 'react';
import { Button, Drawer, Empty, List as ListUI, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { EventType, StoreType } from '../../redux/reducer.typing';

import { addEvent, removeEvent, updateEvent } from '../../redux/actions';
import Event from '../Event';
import Form from '../Form';
import dayjs from 'dayjs';

const EventList = () => {
  const navigate = useNavigate();
  const { day } = useParams();
  const regExDate = /^\d{4}-\d{2}-\d{2}$/;
  const list = useSelector((store: StoreType) => store.events[day || '']);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | undefined>();
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: selectedEvent ? 'Событие обновлено' : 'Событие добавлено',
      duration: 3,
    });
  };
  useLayoutEffect(() => {
    if (!day?.match(regExDate)) {
      navigate('/error');
    }
  }, []);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const handleAddEvent = (values: EventType) => {
    dispatch(addEvent(values));
    setSelectedEvent(undefined);
    success();
    toggleModal();
  };
  const handleUpdateEvent = (values: EventType) => {
    dispatch(updateEvent(values));
    setSelectedEvent(undefined);
    success();
    toggleModal();
  };

  const handleCancel = () => {
    setSelectedEvent(undefined);
    toggleModal();
  };
  const handleChange = (event: EventType) => () => {
    setSelectedEvent(event);
    toggleModal();
  };
  const handleDelete = (event: EventType) => () => {
    dispatch(removeEvent(event));
  };

  return (
    <div style={{ width: '100%', maxWidth: '1280px' }}>
      {contextHolder}
      <ListUI
        header={
          <div>
            <Button onClick={toggleModal} type="primary" style={{ fontWeight: 'bold' }}>
              + Новое событие
            </Button>
          </div>
        }
        bordered
        dataSource={list ? list.sort((a, b) => dayjs(a.start).unix() - dayjs(b.start).unix()) : []}
        locale={{ emptyText: <Empty description={'Нет событий'} /> }}
        renderItem={(event) => (
          <Event key={event.id} event={event} onDelete={handleDelete(event)} onUpdate={handleChange(event)} />
        )}
      />

      <Drawer
        size={'large'}
        title={selectedEvent ? 'Редактирование' : 'Добавление'}
        placement={'right'}
        closable={false}
        onClose={handleCancel}
        open={isModalOpen}
      >
        {isModalOpen && (
          <Form onSubmit={selectedEvent ? handleUpdateEvent : handleAddEvent} event={selectedEvent} day={day || ''} />
        )}
      </Drawer>
    </div>
  );
};
export default EventList;
