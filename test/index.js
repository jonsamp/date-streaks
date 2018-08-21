var moment = require('moment');
var expect = require('chai').expect;
var summary = require('../dist/summary').default;
var trackRecord = require('../dist/trackRecord').default;
var streakRanges = require('../dist/streakRanges').default;

describe('Date Streaks', () => {
  describe('Summary', () => {
    it('should report a summary of streaks', () => {
      var today = moment()
        .startOf('day')
        .toString();
      var resultWithToday = summary({
        dates: [
          new Date(today),
          new Date('01/01/2018'),
          new Date('01/02/2018'),
          new Date('01/03/2018')
        ]
      });

      expect(resultWithToday.currentStreak).to.equal(1);
      expect(resultWithToday.longestStreak).to.equal(3);
      expect(resultWithToday.streaks[0]).to.equal(3);
      expect(resultWithToday.streaks[1]).to.equal(1);
      expect(resultWithToday.todayInStreak).to.equal(true);
      expect(resultWithToday.withinCurrentStreak).to.equal(true);
    });

    it('should report withinCurrentStreak when yesterday is true', () => {
      var yesterday = moment()
        .subtract(1, 'days')
        .startOf('day')
        .toString();
      var resultWithToday = summary({
        dates: [new Date(yesterday)]
      });
      expect(resultWithToday.todayInStreak).to.equal(false);
      expect(resultWithToday.withinCurrentStreak).to.equal(true);
    });

    it('should report a streak longer than 10 days', () => {
      var longStreak = summary({
        dates: [
          new Date('08/19/2018'),
          new Date('08/18/2018'),
          new Date('08/17/2018'),
          new Date('08/16/2018'),
          new Date('08/15/2018'),
          new Date('08/14/2018'),
          new Date('08/13/2018'),
          new Date('08/12/2018'),
          new Date('08/11/2018'),
          new Date('08/10/2018'),
          new Date('08/09/2018')
        ]
      });
      expect(longStreak.longestStreak).to.equal(11);
    });
  });

  describe('Track record', () => {
    it('should report a track record', () => {
      var today = moment()
        .startOf('day')
        .toString();
      var resultWithToday = trackRecord({ dates: [new Date(today)] });

      expect(Object.keys(resultWithToday).includes(today)).to.equal(true);
    });

    it('should take a custom length of days', () => {
      var result = trackRecord({ dates: [new Date('3/19/2018')], length: 10 });
      expect(Object.keys(result).length).to.equal(10);
    });
  });

  describe('Streak Ranges', () => {
    it('should report ranges of streaks', () => {
      var result = streakRanges({
        dates: [
          new Date('01/01/2018'),
          new Date('01/02/2018'),
          new Date('01/04/2018')
        ],
        streaks: [2, 1]
      });

      expect(result[0].start).to.equal(
        moment(new Date('01/04/2018')).toString()
      );
      expect(result[0].end).to.equal(null);
      expect(result[0].duration).to.equal(1);
      expect(result[1].start).to.equal(
        moment(new Date('01/01/2018')).toString()
      );
      expect(result[1].end).to.equal(moment(new Date('01/02/2018')).toString());
      expect(result[1].duration).to.equal(2);
    });
  });
});
