import React from 'react';

import DayDialog from './DayDialog';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

const Calendar = (props) => {
  const [showDayDialog, setShowDayDialog] = React.useState(false);
  const [clickedDate, setClickedDate] = React.useState();
  const clickDate = (arg) => {
    const date = new Date(arg.date);
    setClickedDate(date);
    setShowDayDialog(true);
  }
  return (
    <div>
      <DayDialog
        toggle={() => setShowDayDialog(!showDayDialog)}
        open={showDayDialog}
        date={clickedDate}
        host={props.host}
        mine={props.mine}
      />
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[ dayGridPlugin, interactionPlugin ]}
        aspectRatio="1.3"
        dateClick={clickDate}
      />
    </div>
  )
}

export default Calendar;