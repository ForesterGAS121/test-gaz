import React from 'react';
import {Button, Form as FormUI, Input, Select, TimePicker} from "antd";
import {EventType} from "../../redux/reducer.typing";
import dayjs, {Dayjs} from "dayjs";

export type FormProps = {
    onSubmit: (value: EventType) => void,
    item: EventType | undefined
    day: string
}
const Form: React.FC<FormProps> = ({onSubmit, item, day}) => {

    const updateDay = (date: Dayjs, day: string) => {
        const newDay = dayjs(new Date(day))
        return date.month(newDay.month()).date(newDay.date()).year(newDay.year())
    }
    const handleSubmit = (values: any) => {
        values.start = updateDay(values.start, day)
        values.notification = updateDay(values.start.subtract(values.notification, 'hour'), day)
        values.end = updateDay(values.end, day)
        values.type = 'success'
        onSubmit(values)
    }
    return (
        <FormUI
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 700}}
            onFinish={handleSubmit}
            autoComplete="off"
            key={item?.title}
        >
            <FormUI.Item
                label="Новая задача"
                name="title"
                initialValue={item ? item.title : ''}
                rules={[{required: true, message: 'Укажите название задачи'}]}
            >
                <Input/>
            </FormUI.Item>

            <FormUI.Item
                label="Начало"
                name="start"
                initialValue={item ? item.start : dayjs(Date.now())}
                rules={[{required: true, message: 'Укажите время начала задачи'}]}
            >
                <TimePicker format={'hh:mm'}/>
            </FormUI.Item>
            <FormUI.Item
                label="Конец"
                name="end"
                initialValue={item ? item.end : ''}
                rules={[{required: true, message: 'Укажите время окончания задачи'}, ({getFieldValue}) => ({
                    validator(_, value) {
                        if (getFieldValue('start').toDate() < value.toDate()) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Время окончания не корректное'));
                    },
                }),]}
            >
                <TimePicker format={'hh:mm'}/>
            </FormUI.Item>
            <FormUI.Item
                label="Напомнить за"
                name="notification"
                initialValue={item ? item.start.hour() - item.notification.hour() : 1}
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <Select
                    style={{width: 145}}
                >
                    <Select.Option value={1}>1 час</Select.Option>
                    <Select.Option value={2}>2 часа</Select.Option>
                    <Select.Option value={3}>3 часа</Select.Option>
                    <Select.Option value={4}>4 часа</Select.Option>
                </Select>
            </FormUI.Item>
            <FormUI.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Добавить
                </Button>
            </FormUI.Item>
        </FormUI>
    );
};

export default Form;