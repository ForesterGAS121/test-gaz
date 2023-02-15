import React from 'react';
import { Badge, BadgeProps, Button, List as ListUI, Popconfirm } from 'antd';
import { EventType } from '../../redux/reducer.typing';
import dayjs from 'dayjs';

export type EventProps = {
  event: EventType;
  onUpdate: () => void;
  onDelete: () => void;
};
const Event: React.FC<EventProps> = ({ event, onUpdate, onDelete }) => {
  return (
    <ListUI.Item>
      <ListUI.Item.Meta
        title={
          <Badge
            style={{ textTransform: 'capitalize' }}
            status={event.type as BadgeProps['status']}
            text={event.title}
          />
        }
        description={
          dayjs(event.start).unix() !== dayjs(event.end).unix()
            ? `С ${dayjs(event.start).format('hh:mm a')} до ${dayjs(event.end).format('hh:mm a')}`
            : `В ${dayjs(event.start).format('hh:mm a')}`
        }
      />
      <Button type={'link'} onClick={onUpdate} style={{ fontWeight: 'bold' }}>
        Редактировать
      </Button>
      <Popconfirm
        title="Удалить событие"
        description="Вы уверены, что хотите удалить событие?"
        okText="Да"
        cancelText="Нет"
        onConfirm={onDelete}
      >
        <a style={{ fontWeight: 'bold' }} href="#">
          Удалить
        </a>
      </Popconfirm>
    </ListUI.Item>
  );
};

export default Event;
