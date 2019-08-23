import React from "react";
import moment from "moment";

const EventWrapper = ({ event, children }) => {
  const { title, className } = children.props;
  const customClass = `${className} rbc-event--${event.type}`;
  const hourStart = moment(event.start).hour();
  const hourStop = moment(event.end).hour();
  const gridRowStart = hourStart + 1;

  return (
    <div
      title={title}
      className={customClass}
      style={{ gridRow: `${gridRowStart} / span ${hourStop - hourStart}` }}
    >
      {children.props.children}
    </div>
  );
};

export default EventWrapper;
