import React from 'react'
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker-updated';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
import useState from 'react-usestateref'
import ReactTooltip from "react-tooltip";

const Calendar = (props) => {

    var [startDate, setstartDate, startDateRef] = useState([])
    var [endDate, setendDate, endDateRef] = useState([])
    var [selected, setSelected, selectedRef] = useState(false)



    const handleApply = (event, picker) =>{

        console.log(picker.startDate)
        console.log(picker.endDate)

        setstartDate(picker.startDate)
        setendDate(picker.endDate)

        setSelected(true)
        props.setDate([picker.startDate,picker.endDate])
        console.log(selectedRef.current)

    }

    let locale = {
        format: 'MM-DD-YYYY HH:mm:ss',
        separator: ' - ',
        applyLabel: 'Apply',
        cancelLabel: 'Cancel',
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
                <div>
                    <svg data-tip data-for='selectdate' className={"w-6 h-6 cursor-pointer hover:text-black " + (selectedRef.current ? "text-blue-500" : 'text-gray-800') } fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
            </DatetimeRangePicker>
            <ReactTooltip id='selectdate' backgroundColor={'#000'} effect='solid' place='bottom' aria-haspopup='true'>
                {selectedRef.current ? 'Date Selected' : 'Filter by date'}
            </ReactTooltip>
        </>
    );
}

export default Calendar;