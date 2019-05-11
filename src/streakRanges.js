import { sortDates } from './helpers';
import summary from './summary';

function streakRanges({ dates = [] }) {
  if (dates.length === 0) {
    return [];
  }

  const { streaks = [] } = summary({ dates });
  const allDates = [...sortDates(dates)];

  return streaks
    .reduce((acc, streak) => {
      let start, end;
      let days = allDates.slice(0, streak);
      allDates.splice(0, streak);

      if (days && days.length > 1) {
        start = new Date(days[0]);
        end = new Date(days[days.length - 1]);
      } else {
        start = new Date(days[0]);
        end = null;
      }

      return [
        ...acc,
        {
          start,
          end,
          duration: streak,
        },
      ];
    }, [])
    .reverse();
}

export default streakRanges;
