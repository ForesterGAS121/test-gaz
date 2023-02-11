import React, {useState} from 'react';
import {Button, Drawer, Empty, List as ListUI,} from 'antd'
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


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleAddEvent = (values: any) => {

        dispatch(addEvent(values))
        setIsModalOpen(false);
        setSelectedEvent(undefined)
    };
    const handleUpdateEvent = (values: any) => {
        dispatch(updateEvent(values))
        setIsModalOpen(false)
        setSelectedEvent(undefined)
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
            <ListUI
                header={<div><Button onClick={showModal} type="primary">+ New Event</Button></div>}
                bordered
                dataSource={list || []}
                locale={{emptyText: <Empty description={'Нет событий'}/>}}
                renderItem={(item) => (
                    <Event item={item} onClick={handleChange(item)}/>
                )}
            />
            <Drawer
                title={selectedEvent ? 'Редактирование' : 'Добавление'}
                placement={'right'}
                closable={false}
                onClose={handleCancel}
                open={isModalOpen}
            >
                <Form onSubmit={selectedEvent ? handleUpdateEvent : handleAddEvent} item={selectedEvent}/>
            </Drawer>
        </div>
    );
};

export default List;