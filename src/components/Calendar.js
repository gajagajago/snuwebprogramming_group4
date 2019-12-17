import React from 'react';

import DayDialog from './DayDialog';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

import firestoreHandler from '../firestoreHandler';
const formatDate = (date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return [year, month, day].join('-');
};

const Calendar = (props) => {
  const [showDayDialog, setShowDayDialog] = React.useState(false);
  const [clickedDate, setClickedDate] = React.useState();
  const clickDate = (arg) => {
    const date = new Date(arg.date);
    setClickedDate(date);
    setShowDayDialog(true);
  };
  const addMark = (date, list) => {
    const element = document.querySelectorAll(`[data-date='${date}']`)[0];
    const div = document.createElement('div');
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.display = 'flex';
    div.style.flexDirection = 'column';
    div.style.justifyContent = 'flex-end';
    div.style.alignItems = 'flex-start';
    div.style.pointerEvents = 'none';
    div.style.padding = '10px';
    const color = {
      diary: 'red',
      selfie: 'orange',
      photo: 'cyan',
      schedule: 'blue',
    };
    list.forEach((element) => {
      const dot = document.createElement('div');
      dot.style.width = '5px';
      dot.style.height = '5px';
      dot.style.borderRadius ='50%';
      dot.style.backgroundColor = color[element];
      dot.style.marginBottom = '4px';
      div.append(dot);
    });
    element.append(div);
  };
  const checkMonthEvent = async () => {
    const now = new Date(Date.now());
    const diary = await firestoreHandler.getDiaryByMonth(props.host, now);
    const selfie = await firestoreHandler.getSelfieByMonth(props.host, now);
    const photo = await firestoreHandler.getPhotosByMonth(props.host, now);
    const schedule = await firestoreHandler.getScheduleByMonth(props.host, now);
    const datas = {};
    if (diary) {
      diary.forEach((element) => {
        const date = new Date(element.date.toDate());
        const dateString = formatDate(date);
        if (datas[dateString]) {
          if (!datas[dateString].includes('diary')) {
            datas[dateString].push('diary');
          }
        } else {
          datas[dateString] = ['diary'];
        }
      });
    }
    if (selfie) {
      selfie.forEach((element) => {
        const date = new Date(element.date.toDate());
        const dateString = formatDate(date);
        if (datas[dateString]) {
          if (!datas[dateString].includes('selfie')) {
            datas[dateString].push('selfie');
          }
        } else {
          datas[dateString] = ['selfie'];
        }
      });
    }
    if (photo) {
      photo.forEach((element) => {
        const date = new Date(element.date.toDate());
        const dateString = formatDate(date);
        if (datas[dateString]) {
          if (!datas[dateString].includes('photo')) {
            datas[dateString].push('photo');
          }
        } else {
          datas[dateString] = ['photo'];
        }
      });
    }
    if (schedule) {
      schedule.forEach((element) => {
        const date = new Date(element.date.toDate());
        const dateString = formatDate(date);
        if (datas[dateString]) {
          if (!datas[dateString].includes('schedule')) {
            datas[dateString].push('schedule');
          }
        } else {
          datas[dateString] = ['schedule'];
        }
      });
    }
    for (const key in datas) {
      if (datas.hasOwnProperty(key)) {
        const element = document.querySelectorAll(`[data-date='${key}']`)[0];
        element.innerHTML = '';
        addMark(key, datas[key]);
      }
    }
  };
  React.useEffect(() => {
    checkMonthEvent();
  });
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
        plugins={[dayGridPlugin, interactionPlugin]}
        aspectRatio="1.3"
        dateClick={clickDate}
      />
    </div>
  );
};

export default Calendar;
