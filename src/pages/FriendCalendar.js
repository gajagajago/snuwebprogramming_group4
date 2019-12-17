import React from 'react';
import MainLayout from '../components/MainLayout';
import Calendar from '../components/Calendar';
import {
  useParams
} from "react-router-dom";
import firestoreHandler from '../firestoreHandler';

import { Row, Col } from 'reactstrap';
import './css/MyCalendar.css';
import PropTypes from 'prop-types';

const FriendCalendar = (props) => {
  const { uid } = useParams();
  const [hostOfCalendar, setHostOfCalendar] = React.useState('');
  const fetchHost = async () => {
    const data = await firestoreHandler.getUser(uid);
    setHostOfCalendar(data[0].name);
  }
  React.useEffect(() => {
    fetchHost();
  }, [])
  return (
    <div className="h-100">
      {
        props.user &&
        <MainLayout user={props.user} title={`${hostOfCalendar}님의 캘린더`} />
      }
      <div id="mycalendar-container">
        <Row noGutters className="h-100">
          <Col xl="3" lg="3" md="2" sm="1" xs="0" />
          <Col className="d-flex align-items-center">
            {
              props.user &&
              <Calendar user={props.user} host={uid} mine={false} />
            }
          </Col>
          <Col xl="3" lg="3" md="2" sm="1" xs="0" />
        </Row>
      </div>
    </div>
  )
}

FriendCalendar.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    email: PropTypes.string,
    displayName: PropTypes.string,
  }).isRequired,
};

export default FriendCalendar;