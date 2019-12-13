import React from 'react';
import MainLayout from '../components/MainLayout';
import Calendar from '../components/Calendar';

import { Row, Col } from 'reactstrap';
import './css/MyCalendar.css';

const MyCalendar = (props) => {
  return (
    <div className="h-100">
      <MainLayout />
      <div id="mycalendar-container">
        <Row noGutters className="h-100">
          <Col xl="3" lg="3" md="2" sm="1" xs="0" />
          <Col className="d-flex align-items-center">
            {
              props.user &&
              <Calendar user={props.user} host={props.user.uid} mine={true} />
            }
          </Col>
          <Col xl="3" lg="3" md="2" sm="1" xs="0" />
        </Row>
      </div>
    </div>
  )
}

export default MyCalendar;