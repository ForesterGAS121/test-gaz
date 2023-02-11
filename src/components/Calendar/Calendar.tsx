import React, {useState} from 'react';
import dayjs, {Dayjs} from "dayjs";
import {useSelector} from "react-redux";
import {Badge, BadgeProps, Calendar as CalendarUI} from "antd";
import {StoreType} from "../../redux/reducer.typing";
import styles from './Calendar.module.css'
import {useNavigate} from "react-router";

const Calendar = () => {
    const [value, setValue] = useState(() => dayjs(new Date()));

    const eventsList = useSelector((store: StoreType) => store.events)
    const navigate = useNavigate()
    const onSelect = (newValue: Dayjs) => {
        setValue(newValue);

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
            <ul className={styles.events} onClick={() => {
                navigate(`/${value.format('YYYY-MM-DD')}`)
            }}>
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

            <CalendarUI value={value} onSelect={onSelect} onPanelChange={onPanelChange} dateCellRender={dateCellRender}
                        monthCellRender={monthCellRender}/>
        </>
    );
};

export default Calendar;