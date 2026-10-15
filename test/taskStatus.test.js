'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { STATUSES, canTransition, isStatus, nextStatuses } = require('../src/taskStatus');

test('lists the seven charter statuses in order', () => {
  assert.deepEqual(STATUSES, [
    'Backlog',
    'Ready',
    'Building',
    'Review',
    'Changes requested',
    'Awaiting human approval',
    'Done',
  ]);
});

test('allows the happy path from Backlog to Done', () => {
  const path = ['Backlog', 'Ready', 'Building', 'Review', 'Awaiting human approval', 'Done'];
  for (let i = 0; i < path.length - 1; i += 1) {
    assert.equal(canTransition(path[i], path[i + 1]), true, `${path[i]} -> ${path[i + 1]}`);
  }
});

test('allows the rework loop', () => {
  assert.equal(canTransition('Review', 'Changes requested'), true);
  assert.equal(canTransition('Changes requested', 'Building'), true);
  assert.equal(canTransition('Awaiting human approval', 'Changes requested'), true);
});

test('blocks skipping review or human approval', () => {
  assert.equal(canTransition('Building', 'Done'), false);
  assert.equal(canTransition('Review', 'Done'), false);
  assert.equal(canTransition('Ready', 'Review'), false);
});

test('Done is final', () => {
  assert.deepEqual(nextStatuses('Done'), []);
});

test('rejects unknown statuses', () => {
  assert.equal(isStatus('In progress'), false);
  assert.equal(canTransition('In progress', 'Done'), false);
  assert.throws(() => nextStatuses('In progress'), TypeError);
});

test('nextStatuses returns a copy', () => {
  const next = nextStatuses('Review');
  next.push('Done');
  assert.equal(canTransition('Review', 'Done'), false);
});
