import classes from '../stlyes.module.scss';

/**
 * @param {Object} props
 * @param {string[]} props.hours
 */
export function HourView({ hours }) {
  return (
    <div className={classes.hourLabels}>
      {hours.map((hour) => (
        <div key={hour} className={classes.hour}>
          <span>{hour}</span>
        </div>
      ))}
    </div>
  );
}
