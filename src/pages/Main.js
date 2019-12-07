import React from 'react';
import './css/Main.css';

import Calendar from 'react-calendar';

const Main = () => {
  return (
    <div id="main" className="d-flex justify-content-center align-items-center">
      <Calendar
        onClickDay={(a) => {console.log(a);}}
      />
    </div>
  )
}

export default Main;