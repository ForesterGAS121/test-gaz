import React, {useState} from 'react';
import dayjs, {Dayjs} from "dayjs";
import {useDispatch, useSelector} from "react-redux";

import {Alert, Badge, BadgeProps, Calendar as CalendarUI} from "antd";
import {StoreType} from "../../redux/reducer.typing";

const Calendar = () => {
    const [value, setValue] = useState(() => dayjs(new Date()));
    const [selectedValue, setSelectedValue] = useState(() => dayjs(new Date()));
    const eventsList = useSelector((store: StoreType) => store.events)
    const dispatch = useDispatch()
    const onSelect = (newValue: Dayjs) => {
        setValue(newValue);
        setSelectedValue(newValue);
    };

    const onPanelChange = (newValue: Dayjs) => {
        setValue(newValue);
    };
    const getListData = (value: Dayjs) => {


        return eventsList[value.format('YYYY-MM-DD')] || [];
    };

    const getMonthData = (value: Dayjs) => {
        if (value.month() === 8) {
            return 1394;
        }
    };

    const monthCellRender = (value: Dayjs) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.title}>
                        <Badge status={item.type as BadgeProps['status']} text={item.title}/>
                    </li>
                ))}
            </ul>
        );
    };
    return (
        <>
            <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`}/>
            <CalendarUI value={value} onSelect={onSelect} onPanelChange={onPanelChange} dateCellRender={dateCellRender}
                        monthCellRender={monthCellRender}/>
        </>
    );
};

export default Calendar;