import React, { useEffect } from 'react';
import { Button, Form as FormUI, FormInstance, Input, Select, TimePicker } from 'antd';
import { EventType } from '../../redux/reducer.typing';
import dayjs, { Dayjs } from 'dayjs';

export type FormProps = {
  onSubmit: (value: EventType) => void;
  event: EventType | undefined;
  day: string;
};
export type FormValues = {
  title: string;
  start: Dayjs;
  end: Dayjs;
  notification: number;
  type: string;
};
const optionsNotification = [
  { label: 'Когда начнется', value: 0 },
  { label: 'За 1 минуту', value: 60_000 },
  { label: 'За 5 минут', value: 300_000 },
  { label: 'За 15 минут', value: 900_000 },
  { label: 'За 30 минут', value: 1_800_000 },
  { label: 'За 1 час', value: 3_600_000 },
  { label: 'За 2 часа', value: 7_200_000 },
];
const optionsType = [
  { label: 'Обычное', value: 'success' },
  { label: 'Важное', value: 'warning' },
  { label: 'Особо важное', value: 'error' },
];

const Form: React.FC<FormProps> = ({ onSubmit, event, day }) => {
  const formRef = React.useRef<FormInstance>(null);
  const [form] = FormUI.useForm();
  const start = FormUI.useWatch('start', form);
  const setCurrentDay = (date: Dayjs, day: string) => {
    const currentDay = dayjs(new Date(day));
    return date.date(currentDay.date()).month(currentDay.month()).year(currentDay.year()).second(0).toDate();
  };
  const selectTimeToNotify = (select: number, start: Dayjs) => dayjs(start.valueOf() - select);
  const handleSubmit = (values: FormValues) => {
    onSubmit({
      title: values.title,
      start: setCurrentDay(values.start, day),
      end: setCurrentDay(values.end, day),
      notification: setCurrentDay(selectTimeToNotify(values.notification, values.start), day),
      type: values.type,
      id: Date.now() + Math.random(),
    });
  };
  useEffect(() => {
    if (start) form.setFieldValue('end', start.add(1, 'hour'));
  }, [form, start]);
  return (
    <FormUI
      ref={formRef}
      form={form}
      name="form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 650 }}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <FormUI.Item
        label="Новое событие"
        name="title"
        initialValue={event ? event.title : ''}
        rules={[{ required: true, message: 'Укажите название события' }]}
      >
        <Input />
      </FormUI.Item>

      <FormUI.Item
        label="Начало"
        name="start"
        initialValue={event ? dayjs(event.start) : dayjs()}
        rules={[{ required: true, message: 'Укажите время начала события' }]}
      >
        <TimePicker format={'hh:mm'} />
      </FormUI.Item>

      <FormUI.Item
        label="Конец"
        name="end"
        initialValue={event ? dayjs(event.end) : dayjs(Date.now() + 3_600_000)}
        rules={[
          { required: true, message: 'Укажите время окончания события' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('start').toDate() <= value.toDate()) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Время окончания не корректное'));
            },
          }),
        ]}
      >
        <TimePicker format={'hh:mm'} />
      </FormUI.Item>

      <FormUI.Item
        label="Напомнить"
        name="notification"
        initialValue={event ? dayjs(event.start).diff(event.notification) : 0}
      >
        <Select style={{ width: 145 }}>
          {optionsNotification.map((el) => (
            <Select.Option value={el.value} key={el.value}>
              {el.label}
            </Select.Option>
          ))}
        </Select>
      </FormUI.Item>

      <FormUI.Item label="Тип события" name="type" initialValue={event ? event.type : 'success'}>
        <Select style={{ width: 145 }}>
          {optionsType.map((el) => (
            <Select.Option value={el.value} key={el.value}>
              {el.label}
            </Select.Option>
          ))}
        </Select>
      </FormUI.Item>

      <FormUI.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </FormUI.Item>
    </FormUI>
  );
};

export default Form;
