var dateService = {
  dateFormat: {
    NATURAL: 0,
    UNIX: 1
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
  }
};

module.exports = dateService;
