import React from 'react';
//import { render } from 'react-dom';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import events from "./events";
import EventWrapper from "./EventWrapper";

const localizer = momentLocalizer(moment); // or globalizeLocalizer



  

class CalApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = { events:events };
    //this.state = { events:[] };
    
  }
  
  handleSelect = ({ start, end }) => {
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
      onSelectSlot={this.handleSelect}
      views={["week", "day"]}
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