import React from 'react';
import Dialog from '@material-ui/core/Dialog';

import './css/DayDialog.css';

const DayDialog = (props) => {
  const date = props.date;
  return (
    <Dialog onClose={props.toggle} open={props.open}>
      <div className="d-flex flex-column px-5 py-5">
        <h1>{date ? `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일` : ''}</h1>
      </div>
    </Dialog>
  )
}

export default DayDialog;