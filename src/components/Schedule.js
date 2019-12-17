import React from 'react';
import {Button, Input} from 'reactstrap';
import Checkbox from '@material-ui/core/Checkbox';
import firestoreHandler from '../firestoreHandler';
import './css/Schedule.css';
import PropTypes from 'prop-types';

const Schedule = ({date, host, mine}) => {
  const [schedule, setSchedule] = React.useState('');
  const [scheduleList, setScheduleList] = React.useState([]);
  const [show, setShow] = React.useState();

  const fetchSchedule = async () => {
    const data = await firestoreHandler.getScheduleByDate(host, date);
    if (data) {
      setScheduleList(data);
    } else {
      setScheduleList([]);
    }
  };
  const addSchedule = async () => {
    if (schedule) {
      await firestoreHandler.addSchedule(host, date, schedule);
      await fetchSchedule();
      setSchedule('');
    }
  };
  const deleteSchedule = async (docId) => {
    await firestoreHandler.deleteSchedule(docId);
    await fetchSchedule();
  };
  const doneChange = async (docId, done) => {
    if (done === false) {
      await firestoreHandler.doneSchedule(docId);
    } else {
      await firestoreHandler.undoSchedule(docId);
    } await fetchSchedule();
  };
  const handleKeyEvent = (e) => {
    if (window.event.keyCode === 13) {
      if (e.target.value.trim() === '') {
        return;
      }
      addSchedule();
    }
  };
  React.useEffect(() => {
    fetchSchedule();
  }, []);
  React.useEffect(() => {
    if (mine) {
      setShow('editableSchedulePage');
    } else {
      if (scheduleList.length !== 0) {
        setShow('uneditableSchedulePage');
      } else {
        setShow('noDataPage');
      }
    }
  }, [mine, scheduleList]);
  return (
    <div className="h-100">
      {
        show === 'editableSchedulePage' &&
      <div>
        <div className="d-flex align-items-center">
          <Input id ="inputText" placeholder="add your task"
            className="w-70" onKeyPress={handleKeyEvent}
            type="text" onChange={(e) => setSchedule(e.target.value)}
            value={schedule}>
          </Input>
          <Button color="blue" onClick={addSchedule}> add </Button>
        </div>
        {
          scheduleList.map((element) => {
            const check = (element.done === true) ? 'true' : 'false';
            return (
              <div className="w-100 d-flex align-items-center
              justify-content-between"
              key={element.id} >
                <div className= "d-flex align-items-center" >
                  <Checkbox onChange={() =>
                    doneChange(element.id, element.done)}
                  checked={element.done} color="primary"
                  inputProps={{'aria-label': 'secondary checkbox'}}/>
                  <div id = {check}>
                    {element.content}
                  </div>
                </div>
                <Button color="yellow" onClick={() =>
                  deleteSchedule(element.id)}>delete</Button>
              </div>
            );
          }
          )}
      </div>
      }
      {
        show === 'uneditableSchedulePage' &&
        scheduleList.map((element) => {
          const check = (element.done === true) ? 'true' : 'false';
          return (
            <div className = "w-100 d-flex align-items-center" key={element.id}>
              <Checkbox
                checked={element.done} color="primary"
                inputProps={{'aria-label': 'secondary checkbox'}}/>
              <div id = {check}>
                {element.content}
              </div>
            </div>
          );
        })
      }
      {
        show === 'noDataPage' &&
        <div className="h-100 w-100 d-flex flex-column
          justify-content-center align-items-center">
          <span className="h4"> 등록된 Schedule이 없습니다. </span>
        </div>
      }
    </div>
  );
};

Schedule.propTypes = {
  date: PropTypes.any,
  host: PropTypes.string.isRequired,
  mine: PropTypes.bool.isRequired,
};

export default Schedule;
