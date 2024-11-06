import { MeetingView } from './Meeting-View';
import classes from '../styles.module.scss';
import { Layout } from '../types';

/**
 * @param {Object} props
 * @param {string[]} props.hours
 * @param {Object[]} props.meetings
 * @param {'Slotted' | 'Overlapping'} props.layout
 */
export function DayView({ hours, meetings, layout }) {
  return (
    <div className={classes.day}>
      {hours.slice(1).map((hour) => (
        <div className={classes.hourSlot} key={hour}></div>
      ))}

      <MeetingView meetings={meetings} layout={layout} />
    </div>
  );
}
