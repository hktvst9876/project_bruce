'use strict';

// Task statuses and allowed moves, as defined in the Project Bruce
// Collaboration Charter ("Task queue and handoffs").
const STATUSES = Object.freeze([
  'Backlog',
  'Ready',
  'Building',
  'Review',
  'Changes requested',
  'Awaiting human approval',
  'Done',
]);

const TRANSITIONS = Object.freeze({
  Backlog: ['Ready'],
  Ready: ['Building'],
  Building: ['Review'],
  Review: ['Changes requested', 'Awaiting human approval'],
  'Changes requested': ['Building'],
  'Awaiting human approval': ['Done', 'Changes requested'],
  Done: [],
});

function isStatus(value) {
  return STATUSES.includes(value);
}

function canTransition(from, to) {
  if (!isStatus(from) || !isStatus(to)) return false;
  return TRANSITIONS[from].includes(to);
}

function nextStatuses(from) {
  if (!isStatus(from)) {
    throw new TypeError(`Unknown status: ${JSON.stringify(from)}`);
  }
  return [...TRANSITIONS[from]];
}

module.exports = { STATUSES, canTransition, isStatus, nextStatuses };
