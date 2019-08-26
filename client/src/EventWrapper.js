import React from "react";
import moment from "moment";

const EventWrapper = ({ event, children }) => {
  const { title, className } = children.props;
  const customClass = `${className} rbc-event--${event.type}`;
  const hourStart = moment(event.start).hour();
  // eslint-disable-next-line
  const minuteStart = moment(event.start).minute();
  const hourStop = moment(event.end).hour();
  // eslint-disable-next-line
  const minuteStop = moment(event.end).minute();
  const minuteFactor = (minuteStart === 0 && minuteStop === 0)? 0 : (minuteStart === 30 && minuteStop === 0)? -1 : 1; 
  const gridRowStart = (minuteStart === 0)? (hourStart * 2 + 1) : (hourStart * 2 + 2);
  const gridSpan = (hourStop - hourStart)*2 + minuteFactor;
  return (
    <div
      title={title}
      className={customClass}
      style={{ gridRow: `${gridRowStart} / span ${gridSpan}` }}
    >
      {children.props.children}
    </div>
  );
};

export default EventWrapper;
