import React from 'react';
import {Button, Form as FormUI, FormInstance, Input, Select, TimePicker} from "antd";
import {EventType} from "../../redux/reducer.typing";
import dayjs, {Dayjs} from "dayjs";

export type FormProps = {
    onSubmit: (value: EventType) => void,
    item: EventType | undefined
    day: string
}
const optionsNotification = [
    {label: 'Когда начнется', value: 0},
    {label: 'За 5 минут', value: 300000},
    {label: 'За 15 минут', value: 900000},
    {label: 'За 30 минут', value: 1800000},
    {label: 'За 1 час', value: 3600000},
    {label: 'За 2 часа', value: 7200000},
]
const optionsType = [
    {label: 'Обычное', value: 'success'},
    {label: 'Важное', value: 'warning'},
    {label: 'Особо важное', value: 'error'},
]


const Form: React.FC<FormProps> = ({onSubmit, item, day}) => {
    const formRef = React.useRef<FormInstance>(null);

    const updateDay = (date: Dayjs, day: string) => {
        const newDay = dayjs(new Date(day))
        return date.date(newDay.date()).month(newDay.month()).year(newDay.year())
    }
    const selectMinOrHour = (select: number, start: Dayjs) => dayjs(start.valueOf() - select)

    const handleSubmit = (values: any) => {
        values.start = updateDay(values.start, day)
        values.notification = updateDay(selectMinOrHour(values.notification, values.start), day)
        values.end = updateDay(values.end, day)
        onSubmit(values)
        formRef.current?.resetFields()

    }
    return (
        <FormUI
            ref={formRef}

            initialValues={{onreset: {title: ''}}}
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 700}}
            onFinish={handleSubmit}
            autoComplete="off"
            key={item?.title}
        >
            <FormUI.Item
                label="Новое событие"
                name="title"
                initialValue={item ? item.title : ''}
                rules={[{required: true, message: 'Укажите название события'}]}
            >
                <Input/>
            </FormUI.Item>

            <FormUI.Item
                label="Начало"

                name="start"
                initialValue={item ? item.start : dayjs(Date.now())}
                rules={[{required: true, message: 'Укажите время начала события'}]}
            >
                <TimePicker format={'hh:mm'}/>
            </FormUI.Item>
            <FormUI.Item
                label="Конец"
                name="end"
                initialValue={item ? item.end : dayjs(Date.now())}
                rules={[{required: true, message: 'Укажите время окончания события'}, ({getFieldValue}) => ({
                    validator(_, value) {
                        if (getFieldValue('start').toDate() <= value.toDate()) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Время окончания не корректное'));
                    },
                }),]}
            >
                <TimePicker format={'hh:mm'}/>
            </FormUI.Item>
            <FormUI.Item
                label="Напомнить"
                name="notification"
                initialValue={item ? item.start.diff(item.notification) : ''}
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <Select
                    style={{width: 145}}
                >
                    {optionsNotification.map((el) => <Select.Option value={el.value}
                                                                    key={el.value}>{el.label}</Select.Option>)}
                </Select>
            </FormUI.Item>
            <FormUI.Item
                label="Тип события"
                name="type"
                initialValue={item ? item.type : 'success'}
            >
                <Select
                    style={{width: 145}}
                >
                    {optionsType.map((el) => <Select.Option value={el.value}
                                                            key={el.value}>{el.label}</Select.Option>)}
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