import React, { useEffect } from 'react'
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker-updated';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
import useState from 'react-usestateref'
import ReactTooltip from "react-tooltip";

const Calendar = (props) => {

    var [startDate, setstartDate, startDateRef] = useState('')
    var [endDate, setendDate, endDateRef] = useState('')

    var [Data, setData, DataRef] = useState('')
    var [DataAux, setDataAux, DataAuxRef] = useState('')

    useEffect(() => {
        setData(props.data)
        setDataAux(props.data)
    }, [props.data])



    const handleApply = (event, picker) =>{

        setstartDate(picker.startDate._d.getTime())
        setendDate(picker.endDate._d.getTime())

        let arrayNuevo = []

        DataAuxRef.current.forEach(element => {

            let date = (new Date(element[props.columna].split(' ')[0].split('-')[2] + '-' + element[props.columna].split(' ')[0].split('-')[1] + '-' + element[props.columna].split(' ')[0].split('-')[0] + ' ' + element[props.columna].split(' ')[1])).getTime()
            
            if(date >= picker.startDate._d.getTime() && date <= picker.endDate._d.getTime()){
                arrayNuevo.push(element)
            }

        });

        props.nuevosDatos(arrayNuevo)

    }

    let locale = {
        format: 'MM-DD-YYYY HH:mm:ss',
        separator: ' - ',
        cancelLabel: 'Cancel',
        applyLabel: 'Apply',
        weekLabel: 'W',
        customRangeLabel: 'Custom Range',
        daysOfWeek: moment.weekdaysMin(),
        monthNames: moment.monthsShort(),
        firstDay: moment.localeData().firstDayOfWeek(),
    };


    return (
        <>
            <DatetimeRangePicker
                timePicker
                timePicker24Hour
                showDropdowns
                timePickerSeconds
                className="inline mr-2"
                locale={locale}
                // startDate={startDateRef.current}
                // endDate={endDateRef.current}
                onApply={handleApply}
            >
                {/* <input type="text" value={label}/> */}
                <svg data-tip data-for='calendar' className={"w-6 h-6 cursor-pointer " + (startDateRef.current ? 'text-green-500 hover:text-green-600' : 'text-gray-800 hover:text-black')} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </DatetimeRangePicker>
            <ReactTooltip id='calendar' backgroundColor="#000" effect='solid' place='bottom' aria-haspopup='true'>
                Filter by date
            </ReactTooltip>
        </>
    );
}

export default Calendar;