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
