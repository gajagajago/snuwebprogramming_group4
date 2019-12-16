import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Drawer, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import './css/MainLayout.css'

const Layout = () => {
  const [open, setOpen] = useState(false);
  const openDrawer = () => {
    setOpen(true);
  }
  const closeDrawer = () => {
    setOpen(false);
  }
  return (
    <div>
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
              <span className="h5 px-3">친구 목록</span>
              <ListItem button className="pl-5">
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