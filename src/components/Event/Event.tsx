import React from 'react';
import {Button, List as ListUI, Popconfirm} from "antd";
import styles from "../List/List.module.css";
import {removeEvent} from "../../redux/actions";
import {EventType} from "../../redux/reducer.typing";
import {useDispatch} from "react-redux";

export type EventProps = {
    item: EventType
    onClick: any
}
const Event: React.FC<EventProps> = ({item, onClick}) => {
    const dispatch = useDispatch()
    return (
        <ListUI.Item>
            <ListUI.Item.Meta
                title={item.title}
                description={`${item.start.format('hh:mm a')} до ${item.end.format('hh:mm a')}`}
            />
            <Button type={'link'} onClick={onClick} className={styles.button}>Редактировать</Button>
            <Popconfirm
                className={styles.button}
                title="Удалить задачу"
                description="Вы уверены, что хотите удалить задачу?"
                okText="Да"
                cancelText="Нет"
                onConfirm={() => dispatch(removeEvent(item))}
            >
                <a href="#">Удалить</a>
            </Popconfirm>
        </ListUI.Item>
    );
};

export default Event;