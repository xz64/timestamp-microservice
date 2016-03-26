var dateService = {
  dateFormat: {
    NATURAL: 0,
    UNIX: 1
  },
  months: {
    JANUARY: 0,
    FEBRUARY: 1,
    MARCH: 2,
    APRIL: 3,
    MAY: 4,
    JUNE: 5,
    JULY: 6,
    AUGUST: 7,
    SEPTEMBER: 8,
    OCTOBER: 9,
    NOVEMBER: 10,
    DECEMBER: 11
  },
  getMonth: function getMonth(str) {
    return this.months[str];
  },
  getDay: function getDay(year, month, str) {
    var day = +str;
    // covers January, March, May, July, August, October, and December
    if(isNaN(str) || isNaN(month) || day < 1 || day > 31) { 
      return null;
    }

    if(month == this.months.APRIL || month == this.months.JUNE
      || month == this.months.SEPTEMBER || month == this.months.NOVEMBER) {
      if(day == 31) {
        return null;
      }
    }

    if(month == this.months.FEBRUARY) {
      if((year % 4) == 0 && day > 29) { // leap year
        return null;
      }
      else if((year % 4 !== 0) && day > 28) {
        return null;
      }
    }

    return day;
  },
  getDateFormat: function getDateFormat(str) {
    if(!isNaN(str)) {
      return this.dateFormat.UNIX;
    }
    else if(str.match(/\w+ \d+, \d{4}/)) {
      return this.dateFormat.NATURAL;
    }
    else {
      return null;
    }
  },
  parseNaturalDate: function parseNaturalDate(str) {
    var tokens = str.replace(',', '').split(' ');
    var month = this.getMonth(tokens[0].toUpperCase());
    var year = +tokens[2];
    var day = this.getDay(year, month, tokens[1]);
    console.log(year, month, day);
    return day ? new Date(year, month, day) : null;
  },
  parseUnixTimestamp: function parseUnixTimestamp(str) {
    var timestamp = +str;
    return new Date(timestamp * 1000);
  },
  parseString: function parseString(str) {
    var dateType = this.getDateFormat(str);
    if(dateType === this.dateFormat.UNIX) {
      return this.parseUnixTimestamp(str);
    }
    else if(dateType === this.dateFormat.NATURAL) {
      return this.parseNaturalDate(str);
    }
    else {
      return null;
    }
  }
};

module.exports = dateService;
