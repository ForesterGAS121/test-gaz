import React, {useState} from 'react';
import dayjs, {Dayjs} from "dayjs";
import {useSelector} from "react-redux";
import {Badge, BadgeProps, Calendar as CalendarUI} from "antd";
import {StoreType} from "../../redux/reducer.typing";
import styles from './Calendar.module.css'
import {Link} from "react-router-dom";

const Calendar = () => {
    const [value, setValue] = useState(() => dayjs(new Date()));
    const eventsList = useSelector((store: StoreType) => store.events)
    const onSelect = (newValue: Dayjs) => setValue(newValue);
    const onPanelChange = (newValue: Dayjs) => setValue(newValue);
    const getListData = (value: Dayjs) => eventsList[value.format('YYYY-MM-DD')] || [];

    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value);
        return (
            <Link to={`/${value.format('YYYY-MM-DD')}`}>
                <ul className={styles.events}>
                    {listData.map((item) => (
                        <li key={item.id}>
                            <Badge status={item.type as BadgeProps['status']} text={item.title}/>
                        </li>
                    ))}
                </ul>
            </Link>
        );
    };
    return (
        <CalendarUI value={value} onSelect={onSelect} onPanelChange={onPanelChange} dateCellRender={dateCellRender}/>);
};

export default Calendar;