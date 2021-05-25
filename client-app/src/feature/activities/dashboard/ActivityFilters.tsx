import React from "react";
import { Header, Menu, MenuItem } from "semantic-ui-react";
import Calendar from 'react-calendar';

export default function ActivityFilters() {
  return (
    <>
      <Menu vertical size='large' style={{width: '100%', marginTop: '27px'}}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <MenuItem content="All Activities"></MenuItem>
        <MenuItem content="I'm going"></MenuItem>
        <MenuItem content="I'm hosting"></MenuItem>
      </Menu>
      <Header/>
      <Calendar />
    </>
  );
}
