import React from 'react';
import {Button, Input} from 'reactstrap';
import Checkbox from '@material-ui/core/Checkbox';
import firestoreHandler from '../firestoreHandler';
import './css/Schedule.css';

const Schedule = ({date, host, mine}) => {
  const [schedule, setSchedule] = React.useState('');
  const [scheduleList, setScheduleList] = React.useState([]);
  
  const fetchSchedule = async () => {
    const data = await firestoreHandler.getScheduleByDate(host, date);
    console.log(data);
    if (data) {
      setScheduleList(data);
    } else {
      setScheduleList([]);
    }
  }

  const addSchedule = async () => {
    if(schedule !== '') {
      await firestoreHandler.addSchedule(host, date, schedule);
      await fetchSchedule();
      setSchedule('');
    }
  }

  const deleteSchedule = async (docId) => {
    await firestoreHandler.deleteSchedule(docId);
    await fetchSchedule();
  }

  const doneChange = async (docId, done) => {
    if(done === false) {
      await firestoreHandler.doneSchedule(docId);
    } else {
      await firestoreHandler.undoSchedule(docId);
    } await fetchSchedule();
  }

  const handleKeyEvent = (e) => {
    if(window.event.keyCode === 13) {
      if(e.target.value.trim() === '')
        { return }
      addSchedule();
    }
  }

  React.useEffect(() => {
    fetchSchedule();
  }, [])

  return (
    <div>
      <div className="d-flex align-items-center">
        <Input id ="inputText" placeholder="add your task" 
          className="w-70" onKeyPress={handleKeyEvent}
          type="text" onChange={(e) => setSchedule(e.target.value)} 
          value={schedule}>
        </Input>
        <div> 
          <Button color="blue" onClick={addSchedule}> add </Button>
        </div>
      </div>
      <div>{
        scheduleList.map((element) => {
          let check = (element.done === true) ? 'true' : 'false'
          console.log(check)
          return (
            <div className = "w-100 d-flex align-items-center justify-content-between" key={element.id}>
              <div className= "d-flex align-items-center">
                <Checkbox onChange={() => doneChange(element.id, element.done)} 
                  checked={element.done} color="primary" 
                  inputProps={{'aria-label': 'secondary checkbox'}}/>              
                <div id = {check}> 
                  {element.content}
                </div>
              </div>
              <Button color="yellow" onClick={() => deleteSchedule(element.id)}>delete</Button>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

export default Schedule;
