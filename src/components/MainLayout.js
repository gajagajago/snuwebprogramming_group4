import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from 'reactstrap';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import './css/MainLayout.css'
import firestoreHandler from '../firestoreHandler';

const Layout = () => {
  const [open, setOpen] = useState(false);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [searchEmail, setSearchEmail] = useState('');
  const openDrawer = () => {
    setOpen(true);
  }
  const closeDrawer = () => {
    setOpen(false);
  }
  const searchByEmail = async () => {
    const result = await firestoreHandler.searchUserByEmail(searchEmail);
    console.log(result);
  }
  return (
    <div>
      <Modal isOpen={showAddFriendModal} toggle={() => setShowAddFriendModal(!showAddFriendModal)}>
        <ModalHeader toggle={() => setShowAddFriendModal(!showAddFriendModal)}>친구 추가</ModalHeader>
        <ModalBody>
          <div className="d-flex">
            <Input type="text" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)}></Input>
            <Button color="blueGrey" onClick={searchByEmail}>검색</Button>
          </div>
        </ModalBody>
        {/* <ModalFooter>
          <Button color=
        </ModalFooter> */}
      </Modal>
      <AppBar position="static" color="primary">
        <Toolbar variant="dense" color="primary">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={openDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            저세상 캘린더
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        variant="persistent"
        anchor="left"
      >
        <div id="drawer-container">
          <div id="drawer-header" className="d-flex justify-content-end">
            <ListItem button component={Link} to="" onClick={closeDrawer}>
              <ListItemText primary={"홈"} />
            </ListItem>
            <IconButton onClick={closeDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button component={Link} to="/mycalendar" onClick={closeDrawer} selected={window.location.pathname === '/mycalendar'}>
              <ListItemText primary={"내 캘린더"} />
            </ListItem>
            <div className="d-flex flex-column w-100 mt-3">
              <div className="d-flex justify-content-between align-items-center px-3">
                <div id="friend-list-title">친구 목록</div>
                <Button color="blueGrey" size="sm" onClick={() => { setOpen(false); setShowAddFriendModal(true); } }>친구 추가</Button>
              </div>
              <ListItem button className="pl-4">
                <ListItemText primary={"친구1"} />
              </ListItem>
            </div>
          </List>
        </div>
      </Drawer>
    </div>
  )
}

export default Layout;