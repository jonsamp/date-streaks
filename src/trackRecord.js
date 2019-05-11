import { startOfDay, subDays } from 'date-fns';
import { sortDates } from './helpers';

const trackRecord = ({ dates = [], length = 7 }) => {
  const pastDates = [...Array(length)].map((_, i) =>
    startOfDay(subDays(new Date(), i))
  );
  const sortedDates = sortDates(dates).map(date => startOfDay(date).getTime());

  const result = pastDates.reduce((acc, pastDate) => {
    acc = {
      ...acc,
      [pastDate]: sortedDates.includes(pastDate.getTime()),
    };
    return acc;
  }, {});

  return result;
};

export default trackRecord;
