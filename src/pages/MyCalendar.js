import React from 'react';
import MainLayout from '../components/MainLayout';

import { Row, Col } from 'reactstrap';

import DayDialog from '../components/DayDialog';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import './css/MyCalendar.css';

const MyCalendar = (props) => {
  const [showDayDialog, setShowDayDialog] = React.useState(false);
  const [clickedDate, setClickedDate] = React.useState();
  const clickDate = (arg) => {
    console.log(arg);
    const date = new Date(arg.date);
    console.log(date);
    setClickedDate(date);
    setShowDayDialog(true);
  }
  return (
    <div className="h-100">
      <DayDialog
        toggle={() => setShowDayDialog(!showDayDialog)}
        open={showDayDialog}
        user={props.user}
        date={clickedDate}
      />
      <MainLayout />
      <div id="mycalendar-container">
        <Row noGutters className="h-100">
          <Col xl="3" lg="3" md="2" sm="1" xs="0" />
          <Col className="d-flex align-items-center">
            <FullCalendar
              defaultView="dayGridMonth"
              plugins={[ dayGridPlugin, interactionPlugin ]}
              aspectRatio="1.3"
              dateClick={clickDate}
            />
          </Col>
          <Col xl="3" lg="3" md="2" sm="1" xs="0" />
        </Row>
      </div>
    </div>
  )
}

export default MyCalendar;