var { startOfDay, endOfWeek, subDays, addDays } = require('date-fns');
var expect = require('chai').expect;
var summary = require('../dist/summary').default;
var trackRecord = require('../dist/trackRecord').default;
var streakRanges = require('../dist/streakRanges').default;

describe('Date Streaks', () => {
  describe('Summary', () => {
    it('should report a summary of streaks', () => {
      var today = startOfDay(new Date());
      var result = summary({
        dates: [
          new Date(today),
          new Date('01/01/2018'),
          new Date('01/02/2018'),
          new Date('01/03/2018'),
        ],
      });

      expect(result.currentStreak).to.equal(1);
      expect(result.longestStreak).to.equal(3);
      expect(result.streaks[0]).to.equal(3);
      expect(result.streaks[1]).to.equal(1);
      expect(result.todayInStreak).to.equal(true);
      expect(result.withinCurrentStreak).to.equal(true);
    });

    it('should report withinCurrentStreak when yesterday is true', () => {
      var today = startOfDay(new Date());
      var yesterday = subDays(today, 1);
      var result = summary({
        dates: [yesterday],
      });
      expect(result.currentStreak).to.equal(1);
      expect(result.longestStreak).to.equal(1);
      expect(result.todayInStreak).to.equal(false);
      expect(result.withinCurrentStreak).to.equal(true);
    });

    it('should report withinCurrentStreak when tomorrow is true', () => {
      var today = startOfDay(new Date());
      var tomorrow = addDays(today, 1);
      var yesterday = subDays(today, 1);
      var result = summary({
        dates: [yesterday, today, tomorrow],
      });
      expect(result.currentStreak).to.equal(3);
      expect(result.longestStreak).to.equal(3);
      expect(result.todayInStreak).to.equal(true);
      expect(result.withinCurrentStreak).to.equal(true);
    });

    it('should report withinCurrentStreak when future unconnected dates are reported', () => {
      var today = startOfDay(new Date());
      var futureDate = addDays(today, 3);
      var yesterday = subDays(today, 1);
      var result = summary({
        dates: [yesterday, today, futureDate],
      });
      expect(result.currentStreak).to.equal(1);
      expect(result.longestStreak).to.equal(2);
      expect(result.todayInStreak).to.equal(true);
      expect(result.withinCurrentStreak).to.equal(true);
    });

    it('should report todayInStreak false', () => {
      var today = startOfDay(new Date());
      var futureDate = addDays(today, 3);
      var yesterday = subDays(today, 1);
      var result = summary({
        dates: [yesterday, futureDate],
      });
      expect(result.currentStreak).to.equal(1);
      expect(result.longestStreak).to.equal(1);
      expect(result.todayInStreak).to.equal(false);
      expect(result.withinCurrentStreak).to.equal(true);
    });

    it('should report withinCurrentStreak false', () => {
      var today = startOfDay(new Date());
      var dateInPast = subDays(today, 3);
      var result = summary({
        dates: [dateInPast],
      });
      expect(result.currentStreak).to.equal(0);
      expect(result.longestStreak).to.equal(1);
      expect(result.todayInStreak).to.equal(false);
      expect(result.withinCurrentStreak).to.equal(false);
    });

    it('should report a streak of zero', () => {
      var result = summary({
        dates: [],
      });
      expect(result.currentStreak).to.equal(0);
      expect(result.longestStreak).to.equal(0);
      expect(result.streaks[0]).to.equal(1);
      expect(result.todayInStreak).to.equal(false);
      expect(result.withinCurrentStreak).to.equal(false);
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
          new Date('08/09/2018'),
        ],
      });
      expect(longStreak.longestStreak).to.equal(11);
    });

    it('should report correct streak summary with unordered dates', () => {
      var longStreak = summary({
        dates: [
          new Date('08/19/2018'),
          new Date('08/10/2018'),
          new Date('08/17/2018'),
          new Date('08/18/2018'),
          new Date('08/15/2018'),
          new Date('08/14/2018'),
          new Date('08/16/2018'),
          new Date('08/12/2018'),
          new Date('08/13/2018'),
          new Date('08/11/2018'),
          new Date('08/09/2018'),
        ],
      });

      expect(longStreak.longestStreak).to.equal(11);
    });

    it('should accept an array as input', () => {
      var longStreak = summary([
          new Date('08/19/2018'),
          new Date('08/10/2018'),
          new Date('08/17/2018'),
          new Date('08/18/2018'),
          new Date('08/15/2018'),
          new Date('08/14/2018'),
          new Date('08/16/2018'),
          new Date('08/12/2018'),
          new Date('08/13/2018'),
          new Date('08/11/2018'),
          new Date('08/09/2018'),
        ]);

      expect(longStreak.longestStreak).to.equal(11);
    });
  });

  describe('Track record', () => {
    it('should report a track record', () => {
      var today = startOfDay(new Date());
      var result = trackRecord({ dates: [today] });

      expect(result[today]).to.equal(true);
    });

    it('should take a custom length of days', () => {
      var result = trackRecord({ dates: [new Date('3/19/2018')], length: 10 });
      expect(Object.keys(result).length).to.equal(10);
    });

    it('should take a custom end date', () => {
      var today = startOfDay(new Date());
      var result = trackRecord({dates: [today], startDate: endOfWeek(new Date())});
      expect(result[today]).to.equal(true);
    });

    it('should take a custom length of days and a custom end date', () => {
      var today = startOfDay(new Date());
      var result = trackRecord({dates: [today], length: 10, endDate: endOfWeek(new Date())});
      expect(result[today]).to.equal(true);
    });


    it('should accept an empty array as input', () => {
      var result = trackRecord({ dates: [] });
      debugger;
      expect(Object.keys(result).length).to.equal(7);
    });
  });

  describe('Streak Ranges', () => {
    it('should report ranges of streaks', () => {
      var result = streakRanges({
        dates: [
          new Date('01/01/2018'),
          new Date('01/02/2018'),
          new Date('01/04/2018'),
        ],
        streaks: [2, 1],
      });

      expect(result[0].start.getTime()).to.equal(
        new Date('01/04/2018').getTime()
      );
      expect(result[0].end).to.equal(null);
      expect(result[0].duration).to.equal(1);
      expect(result[1].start.getTime()).to.equal(
        new Date('01/01/2018').getTime()
      );
      expect(result[1].end.getTime()).to.equal(
        new Date('01/02/2018').getTime()
      );
      expect(result[1].duration).to.equal(2);
    });
  });
});
