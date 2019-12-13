import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import Diary from './Diary';
import Selfie from './Selfie';
import Photo from './Photo';
import Schedule from './Schedule';

import './css/DayDialog.css';

const DayDialog = (props) => {
  const date = props.date;
  const host = props.host;
  const mine = props.mine;
  const [activeTab, setActiveTab] = React.useState('diary');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
  return (
    <Dialog onClose={props.toggle} open={props.open}>
      <div className="d-flex flex-column px-5 py-5 h-100">
        <h1>{date ? `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일` : ''}</h1>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === 'diary' ? 'active' : ''}
              onClick={() => { toggle('diary'); }}
            >
              Diary
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === 'selfie' ? 'active' : ''}
              onClick={() => { toggle('selfie'); }}
            >
              Selfie
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === 'photo' ? 'active' : ''}
              onClick={() => { toggle('photo'); }}
            >
              Photo
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === 'schedule' ? 'active' : ''}
              onClick={() => { toggle('schedule'); }}
            >
              Schedule
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="diary">
            <Diary />
          </TabPane>
          <TabPane tabId="selfie">
            <Selfie date={date} host={host} mine={mine} />
          </TabPane>
          <TabPane tabId="photo">
            <Photo />
          </TabPane>
          <TabPane tabId="schedule">
            <Schedule />
          </TabPane>
        </TabContent>
      </div>
    </Dialog>
  )
}

export default DayDialog;