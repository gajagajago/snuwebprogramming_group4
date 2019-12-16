import React from 'react';
import {Button, Input} from 'reactstrap';
import Checkbox from '@material-ui/core/Checkbox';
import firestoreHandler from '../firestoreHandler';
const Schedule = ({ date, host, mine}) => {
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
    await firestoreHandler.addSchedule(host, date, schedule);
    await fetchSchedule();
    setSchedule('');
  }

  const deleteSchedule = async (docId) => {
    await firestoreHandler.deleteSchedule(docId);
    await fetchSchedule();
  }

  React.useEffect(() => {
    fetchSchedule();
  }, [])
  return (
    <div>
      <div className="d-flex">
        <Input id = "inputText" className="w-70"
        type="text" onChange={(e) => setSchedule(e.target.value)} value={schedule}></Input>
        <Button color="blueGrey" onClick={addSchedule}>add</Button>
      </div>
      <div>{
        scheduleList.map((element) => {
          return (
            <div className = "w-100 d-flex align-items-center justify-content-between" key={element.id}>
              <div className="d-flex align-items-center">
                <Checkbox  value="secondary" color="primary" 
                  inputProps={{ 'aria-label': 'secondary checkbox' }}/>              
                <div>{element.content}</div>
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
