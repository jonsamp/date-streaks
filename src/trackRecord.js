import startOfDay from 'date-fns/start_of_day';
import subDays from 'date-fns/sub_days';
import {sortDates} from './helpers';

const trackRecord = ({ dates = [], length = 7, startDate = new Date() }) => {
  const pastDates = [...Array(length)].map((_, i) =>
    startOfDay(subDays(startDate, i))
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
