import React from 'react';
//import { render } from 'react-dom';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import events from "./events";


const localizer = momentLocalizer(moment); // or globalizeLocalizer

const CalApp = props => (
  <div style={{ height: 700 }}>
    <Calendar
      localizer={localizer}
      events={events}
      
      defaultDate={new Date(2019, 3, 1)}
    defaultView="day"

    />
  </div>
);
//step={60}
//min={new Date(2008, 0, 1, 8, 0)} // 8.00 AM
//max={new Date(2008, 0, 1, 17, 0)} // Max will be 6.00 PM!
//      views={["week"]}
export default CalApp;