var test = require('tape');
var dateService = require('../src/dateService.js');

test('identifies invalid date format', function(t) {
  t.equal(dateService.getDateFormat('Januury 2015'), null);
  t.end();
});
