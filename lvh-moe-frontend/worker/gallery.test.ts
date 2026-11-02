// Run with `pnpm test` (Node's built-in test runner + type stripping).
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { pickDaily } from './gallery.ts';

const ids = Array.from({ length: 20 }, (_, i) => `img-${i}`);

test('picks 5 distinct images from the pool', () => {
    const picks = pickDaily(ids, '2026-11-02');
    assert.equal(picks.length, 5);
    assert.equal(new Set(picks).size, 5);
    for (const id of picks) assert.ok(ids.includes(id));
});

test('same day gives the same picks', () => {
    assert.deepEqual(pickDaily(ids, '2026-11-02'), pickDaily(ids, '2026-11-02'));
});

test('different days usually give different picks', () => {
    const days = Array.from({ length: 10 }, (_, i) => `2026-11-${String(i + 1).padStart(2, '0')}`);
    const distinct = new Set(days.map((day) => pickDaily(ids, day).join(',')));
    assert.ok(distinct.size >= 9, `only ${distinct.size} distinct selections over 10 days`);
});

test('returns everything when fewer than 5 images exist', () => {
    const small = ['a', 'b', 'c'];
    assert.deepEqual([...pickDaily(small, '2026-11-02')].sort(), small);
    assert.deepEqual(pickDaily([], '2026-11-02'), []);
});

test('does not mutate the input', () => {
    const copy = [...ids];
    pickDaily(ids, '2026-11-02');
    assert.deepEqual(ids, copy);
});
