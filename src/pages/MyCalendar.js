import React from 'react';
import MainLayout from '../components/MainLayout';
import Calendar from '../components/Calendar';
import {Row, Col} from 'reactstrap';
import './css/MyCalendar.css';
import PropTypes from 'prop-types';

const MyCalendar = (props) => {
  return (
    <div className="h-100">
      {
        props.user &&
        <MainLayout user={props.user} title='내 캘린더' />
      }
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
  );
};

MyCalendar.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    email: PropTypes.string,
    displayName: PropTypes.string,
  }).isRequired,
};

export default MyCalendar;
