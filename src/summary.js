import moment from 'moment';
import { filterInvalidDates, sortDates, relativeDates } from './helpers';

function summary({ dates = [] }) {
  const { today, yesterday } = relativeDates;
  const allDates = filterInvalidDates(dates);
  const sortedDates = sortDates(allDates);

  return sortedDates.reduce(
    (acc, date, index) => {
      const first = moment(date);
      const second = sortedDates[index + 1]
        ? moment(sortedDates[index + 1])
        : first;
      const diff = second.diff(first, 'days');
      const isToday = moment(date).diff(today) === 0;
      const isYesterday = moment(date).diff(yesterday) === 0;

      if (diff === 0) {
        if (isToday) {
          acc.todayInStreak = true;
        }
      } else {
        diff === 1
          ? ++acc.streaks[acc.streaks.length - 1]
          : acc.streaks.push(1);
      }

      return {
        ...acc,
        longestStreak: Math.max(...acc.streaks),
        withinCurrentStreak: acc.withinCurrentStreak
          ? true
          : isToday || isYesterday,
        currentStreak:
          isToday || isYesterday ? acc.streaks[acc.streaks.length - 1] : 0
      };
    },
    {
      currentStreak: 0,
      longestStreak: 0,
      streaks: [1],
      todayInStreak: false,
      withinCurrentStreak: false
    }
  );
}

export default summary;
