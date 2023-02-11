import React from 'react';
import {Button, Form as FormUI, Input, TimePicker} from "antd";
import {EventType} from "../../redux/reducer.typing";

export type FormProps = {
    onSubmit: (value: EventType) => void,
    item: EventType | undefined
}
const Form: React.FC<FormProps> = ({onSubmit, item}) => {
    console.log(item)
    return (
        <FormUI
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 600}}
            onFinish={onSubmit}
            autoComplete="off"
            key={item?.title}
        >
            <FormUI.Item
                label="Новая задача"
                name="title"
                initialValue={item ? item.title : ''}
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input/>
            </FormUI.Item>

            <FormUI.Item
                name="start"
                initialValue={item ? item.start : ''}
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <TimePicker format={'hh:mm'}/>
            </FormUI.Item>
            <FormUI.Item
                name="end"
                initialValue={item ? item.end : ''}
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <TimePicker format={'hh:mm'}/>
            </FormUI.Item>
            <FormUI.Item
                label="Напоминание"
                name="notification"
                initialValue={item ? item.notification : ''}
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <TimePicker format={'hh:mm'}/>
            </FormUI.Item>
            <FormUI.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </FormUI.Item>
        </FormUI>
    );
};

export default Form;