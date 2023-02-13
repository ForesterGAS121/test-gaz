import React, {useState} from 'react';
import {Button, Drawer, Empty, List as ListUI, message,} from 'antd'
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {EventType, StoreType} from "../../redux/reducer.typing";
import styles from './List.module.css'
import {addEvent, updateEvent} from "../../redux/actions";
import Event from "../Event";
import Form from "../Form";

const List = () => {
    const {day} = useParams()
    const list = useSelector((store: StoreType) => store.events[day || ''])
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventType | undefined>()
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: selectedEvent ? 'Событие обновленно' : 'Событие добавленно',
            duration: 3,
        });
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleAddEvent = (values: any) => {
        dispatch(addEvent(values))
        setIsModalOpen(false);
        setSelectedEvent(undefined)
        success()
    };
    const handleUpdateEvent = (values: any) => {
        dispatch(updateEvent(values))
        setIsModalOpen(false)
        setSelectedEvent(undefined)
        success()
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedEvent(undefined)
    };
    const handleChange = (event: EventType) => () => {
        setSelectedEvent(event)
        setIsModalOpen(true)
    }

    return (
        <div className={styles.container}>
            {contextHolder}
            <ListUI
                header={<div><Button onClick={showModal} type="primary">+ Новое событие</Button></div>}
                bordered
                dataSource={list ? list.sort((a, b) => a.start.unix() - b.start.unix()) : []}
                locale={{emptyText: <Empty description={'Нет событий'}/>}}
                renderItem={(item) => (
                    <Event item={item} onClick={handleChange(item)}/>
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
                <Form onSubmit={selectedEvent ? handleUpdateEvent : handleAddEvent} item={selectedEvent}
                      day={day || ''}/>
            </Drawer>
        </div>
    );
};

export default List;