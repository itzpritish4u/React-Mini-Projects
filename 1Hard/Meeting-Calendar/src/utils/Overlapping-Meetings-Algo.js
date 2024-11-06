import { getNextNonOverlappingMeeting, sortMeetings, sortMeetingsByColumn } from './Helper.js';

export function getOverlappingMeetings(meetings) {
  meetings.forEach((m) => (m.column = 0));
  const sortedMeetings = sortMeetings(meetings);

  let columnIdx = 1;
  while (sortedMeetings.some((m) => !m.column)) {
    placeMeetingsByColumn(meetings, columnIdx++);
  }

  return sortMeetingsByColumn(meetings);
}

function placeMeetingsByColumn(meetings, column) {
  let meeting = getNextNonOverlappingMeeting(meetings, null);

  while (meeting) {
    meeting.column = column;
    meeting = getNextNonOverlappingMeeting(meetings, meeting);
  }
}
