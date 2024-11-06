import { Layout } from '../types';
import { getDuration } from '../utils/Helper';
import classes from '../styles.module.scss';
import { columnWidths, hrOffset, oneUnit } from '../config';

/**
 * @param {Object} props
 * @param {Object[]} props.meetings
 * @param {'Slotted' | 'Overlapping'} props.layout
 */
export function MeetingView({ meetings, layout }) {
  return (
    <div className={classes.meetings}>
      {meetings.map((meeting) => {
        const duration = getDuration(meeting.start, meeting.end);
        const [startHr, startMin] = meeting.start.split(':').map((x) => parseInt(x));
        const width =
          layout === Layout.Overlapping
            ? columnWidths.get(meeting.column)
            : 100 / (meeting.totalConflicts + 1);
        const height = duration * oneUnit;
        const top = ((startHr - hrOffset) * 60 + startMin) * oneUnit;
        const left = (100 / (meeting.totalConflicts + 1)) * (meeting.column - 1);

        return (
          <button
            key={meeting.id}
            className={classes.meeting}
            style={{
              width: `${width}%`,
              height: `${height}%`,
              top: `${top}%`,
              left: layout === Layout.Overlapping ? 'unset' : `${left}%`,
            }}
            title={`${meeting.title} : ${meeting.start} - ${meeting.end}`}
          >
            <span>{meeting.title}</span>
            <span>
              {meeting.start} - {meeting.end}
            </span>
          </button>
        );
      })}
    </div>
  );
}
