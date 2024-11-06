import { useState } from 'react';
import { hours } from './config';
import { getMeetings } from './utils/Helper';
import { DayView } from './components/Day-View';
import { HourView } from './components/Hour-View';
import { getSlottedMeetings } from './utils/Slotted-Meetings-Algo';
import { getOVerlappingMeetings } from './utils/Overlapping-Meetings-Algo';
import classes from './stlyes.module.scss';

// Define Layout constants as JavaScript does not have TypeScript enums
const Layout = {
  Slotted: 'Slotted',
  Overlapping: 'Overlapping',
};

export default function Calendar() {
  const [layout, setLayout] = useState(Layout.Slotted);
  const [meetings, setMeetings] = useState(getSlottedMeetings(getMeetings()));

  function onLayoutChange(newLayout) {
    setLayout(newLayout);
    setMeetings(
      newLayout === Layout.Overlapping
        ? getOVerlappingMeetings(meetings)
        : getSlottedMeetings(meetings)
    );
  }

  function resetMeetings() {
    const randomMeetings = getMeetings();
    setMeetings(
      layout === Layout.Overlapping
        ? getOVerlappingMeetings(randomMeetings)
        : getSlottedMeetings(randomMeetings)
    );
  }

  return (
    <>
      <div className={classes.layout}>
        <label>
          <input
            type="radio"
            name="layout"
            value="overlapping"
            checked={layout === Layout.Overlapping}
            onChange={() => onLayoutChange(Layout.Overlapping)}
          />
          Overlapping
        </label>
        <label>
          <input
            type="radio"
            name="layout"
            value="slotted"
            checked={layout === Layout.Slotted}
            onChange={() => onLayoutChange(Layout.Slotted)}
          />
          Slotted
        </label>

        <button onClick={resetMeetings}>Randomize</button>
      </div>

      <div className={classes.holder}>
        <HourView hours={hours} />
        <DayView hours={hours} meetings={meetings} layout={layout} />
      </div>
    </>
  );
}
