import React from "react";
import dayjs from 'dayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import style from './pageStyle.css'

function Calendar({ dateObj, onDateChange }) {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
            className="calendar"
            timeSteps={{minutes: 30}} 
            minTime={dayjs().set('hour', 8)} 
            maxTime={dayjs().set('hour', 17)}
            value={dateObj} 
            onChange={onDateChange}/>
        </LocalizationProvider>
    )
}

export default Calendar;