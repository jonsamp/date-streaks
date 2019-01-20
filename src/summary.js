import moment from "moment";
import { filterInvalidDates, sortDates, relativeDates } from "./helpers";

function summary({ dates = [] }) {
  const { today, yesterday, tomorrow } = relativeDates;
  const allDates = filterInvalidDates(dates);
  const sortedDates = sortDates(allDates);

  const result = sortedDates.reduce(
    (acc, date, index) => {
      const first = moment(date);
      const second = sortedDates[index + 1]
        ? moment(sortedDates[index + 1])
        : first;
      const diff = second.diff(first, "days");
      const isToday = acc.isToday || moment(date).diff(today) === 0;
      const isYesterday = acc.isYesterday || moment(date).diff(yesterday) === 0;
      const isInFuture = acc.isInFuture || moment(today).diff(date) < 0;

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
        withinCurrentStreak:
          acc.isToday ||
          acc.isYesterday ||
          acc.isInFuture ||
          isToday ||
          isYesterday ||
          isInFuture,
        currentStreak:
          isToday || isYesterday || isInFuture
            ? acc.streaks[acc.streaks.length - 1]
            : 0,
        isInFuture,
        isYesterday,
        isToday
      };
    },
    {
      currentStreak: 0,
      longestStreak: 0,
      streaks: [1],
      todayInStreak: false,
      withinCurrentStreak: false,
      isInFuture: false,
      isToday: false,
      isYesterday: false
    }
  );

  const { isToday, isYesterday, isInFuture, ...rest } = result;

  return rest;
}

export default summary;
