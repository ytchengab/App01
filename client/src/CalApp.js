import React from 'react';
//import { render } from 'react-dom';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
//import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import events from "./events";
import EventWrapper from "./EventWrapper";

const localizer = momentLocalizer(moment); // or globalizeLocalizer
//const DragAndDropCalendar = withDragAndDrop(Calendar)


  

class CalApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = { events:events};
    //this.state = { events:[] };
    this.moveEvent = this.moveEvent.bind(this)
    this.createNewEvent = this.createNewEvent.bind(this)
    
  }
  
  createNewEvent = ({ start, end }) => {
    const title = window.prompt('New Event name')
    let currentIds = this.state.events.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }
    //var prevEvent = new Array();
    var prevEvent = Object.assign(this.state.events);
    
    
  var newEvent = {
   id : idToBeAdded,
   title : title,
   start : start,
   end : end
    };  
    
    //var varJSON = JSON.parse(JSON.stringify(newEvent));

          
          
    if (title)
      this.setState({
        events:prevEvent.concat(newEvent)
        
      })
  }
  
  resizeEvent = ({ event, start, end }) => {
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      // eslint-disable-next-line
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })

    //alert(`${event.title} was resized to ${start}-${end}`)
  }
  
  //moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
  moveEvent({ event, start, end}) {
    const { events } = this.state

    const idx = events.indexOf(event)
    //let allDay = event.allDay

    /*if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }*/

    //const updatedEvent = { ...event, start, end, allDay }
    const updatedEvent = { ...event, start, end }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents,
    })

    // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
  }
  
  /////////////////////////////////////////////////////////////////
  
  render(){
      
 return ( 
      <div style={{ height: 700 }}>
    <Calendar
      selectable
      localizer={localizer}
      events={this.state.events}
      defaultDate={new Date(2019, 3, 27)}
      defaultView="day"
      components={{
      eventWrapper: EventWrapper
      // event: Event
    }}
      onSelectSlot={this.createNewEvent}
    />
    </div>
    );
    }
  };
//step={60}
//min={new Date(2008, 0, 1, 8, 0)} // 8.00 AM
//max={new Date(2008, 0, 1, 17, 0)} // Max will be 6.00 PM!
//      views={["week"]}
export default CalApp;