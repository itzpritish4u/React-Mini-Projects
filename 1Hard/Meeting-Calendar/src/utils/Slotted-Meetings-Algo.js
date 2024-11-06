import { checkOverlap, getNextNonOverlappingMeeting, sortMeetings } from './Helper.js';

export function getSlottedMeetings(meetings) {
  meetings.forEach((m) => (m.column = 0));
  const sortedMeetings = sortMeetings(meetings);

  let columnIdx = 1;
  while (sortedMeetings.some((m) => !m.column)) {
    placeMeetingsByColumn(meetings, columnIdx++);
  }

  return meetings;
}

function placeMeetingsByColumn(meetings, column) {
  let meeting = getNextNonOverlappingMeeting(meetings, null);
  meetings.forEach((m) => (m.modified = false));

  while (meeting) {
    meeting.column = column;
    setConflicts(meetings, meeting);
    meeting = getNextNonOverlappingMeeting(meetings, meeting);
  }
}

function setConflicts(meetings, meeting) {
  const meetingConflicts = [];
  const directlyImpactedMeetings = getImpactedMeetings(meetings, meeting);
  const allImpactedMeetings = getAllImpactedMeetings(meetings, meeting).concat(
    directlyImpactedMeetings
  );

  directlyImpactedMeetings.forEach((m) => {
    meetingConflicts[m.column] = true;
  });

  allImpactedMeetings.forEach((m) => {
    if (!m.modified) {
      m.totalConflicts = (m.totalConflicts || 0) + 1;
      m.modified = true;
    }
  });

  meeting.totalConflicts = meetingConflicts.filter(Boolean).length;
}

function getImpactedMeetings(meetings, meeting) {
  return meetings.filter(
    (m) => m.column && m.column !== meeting.column && checkOverlap(meeting, m)
  );
}

function getAllImpactedMeetings(meetings, meeting) {
  let set = new Set();
  const impactedMeetings = getPreviousColumnImpactedMeetings(meetings, meeting);
  impactedMeetings.forEach((m) => {
    set.add(m);
    set = new Set([...set, ...getAllImpactedMeetings(meetings, m)]);
  });

  return Array.from(set);
}

function getPreviousColumnImpactedMeetings(meetings, meeting) {
  return meetings.filter((m) => m.column === meeting.column - 1 && checkOverlap(meeting, m));
}