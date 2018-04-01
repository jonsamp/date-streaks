import moment from 'moment';
import { sortDates } from './helpers';

const trackRecord = ({ dates = [], length = 7 }) => {
  const pastDates = [...Array(length)].map((n, i) =>
    moment()
      .subtract(i, 'days')
      .startOf('day')
  );
  const sortedDates = sortDates(dates);
  const momentDates = sortedDates.map(date => moment(date).toString());

  const result = pastDates.reduce((acc, date) => {
    acc = {
      ...acc,
      [moment(date)]: momentDates.includes(date.toString())
    };
    return acc;
  }, {});

  return result;
};

export default trackRecord;
