var test = require('tape');
var dateService = require('../src/dateService.js');

test('identifies invalid date format', function(t) {
  t.notOk(dateService.getDateFormat('Januury 2015'));
  t.end();
});

test('identifies natural date format', function(t) {
  t.equal(dateService.getDateFormat('February 3, 2015'),
    dateService.dateFormat.NATURAL);
  t.end();
});

test('identifies unix date format', function(t) {
  t.equal(dateService.getDateFormat('1458946064'),
    dateService.dateFormat.UNIX);
  t.end();
});

test('rejects natural date of Feb 29th on non-leap year', function(t) {
  t.notOk(dateService.parseNaturalDate('February 29, 2015'));
  t.end();
});

test('parses Feb 29th on leap year', function(t) {
  t.equal(dateService.parseNaturalDate('February 29, 2016').getTime(),
    new Date(2016, 1, 29).getTime());
  t.end();
});

test('parses valid natural date', function(t) {
  t.equal(dateService.parseNaturalDate('December 31, 1994').getTime(),
    new Date(1994, 11, 31).getTime());
  t.end();
});

test('parses month without case sensitivity', function(t) {
  t.equal(dateService.parseNaturalDate('apRiL 3, 2000').getTime(),
    new Date(2000, 3, 3).getTime());
  t.end();
});

test('identifies invalid natural date', function(t) {
  t.notOk(dateService.parseNaturalDate('foo'));
  t.end();
});

test('parses unix timestamp', function(t) {
  t.equal(dateService.parseUnixTimestamp('1457829351').getTime(),
    new Date(Date.UTC(2016, 2, 13, 0, 35, 51)).getTime());
  t.end();
});

test('parses negative unix timestamp', function(t) {
  t.equal(dateService.parseUnixTimestamp('-25393718').getTime(),
    new Date(Date.UTC(1969, 2, 13, 2, 11, 22)).getTime());
  t.end();
});

test('parses numeric string as unix timestamp', function(t) {
  t.equal(dateService.parseString('-25393718').getTime(),
    new Date(Date.UTC(1969, 2, 13, 2, 11, 22)).getTime());
  t.end();
});

test('parses invalid string as falsy', function(t) {
  t.notOk(dateService.parseString('-2dfsd5393718'));
  t.end();
});

test('parses natural date string', function(t) {
  t.equal(dateService.parseString('January 26, 1990').getTime(),
    new Date(1990, 0, 26).getTime());
  t.end();
});

test('return null fields in JSON for invalid date', function(t) {
  t.deepEqual(dateService.getJSON('January 35, 1990'),
    { unix: null, natural: null });
  t.end();
});

test('return null fields in JSON for invalid date', function(t) {
  t.deepEqual(dateService.getJSON('January 35, 1990'),
    { unix: null, natural: null });
  t.end();
});

test('return JSON object for proper timestamp', function(t) {
  t.deepEqual(dateService.getJSON('1451616242'),
    { unix: 1451616242, natural: 'January 1, 2016'})
  t.end();
});

test('return null fields in JSON for empty string', function(t) {
  t.deepEqual(dateService.getJSON(''),
     { unix: null, natural: null });
  t.end();
});
