import { startOfDay, subDays, addDays, isValid } from 'date-fns';

export const relativeDates = () => ({
  today: startOfDay(new Date()),
  yesterday: startOfDay(subDays(new Date(), 1)),
  tomorrow: startOfDay(addDays(new Date(), 1)),
});

export const filterInvalidDates = dates =>
  dates.filter(date =>
    !isValid(date)
      ? console.error(
          `The date '${date}' is not in a valid date format and date-streaks is ignoring it. Browsers do not consistently support this and this package's results may fail. Verify the array of dates you're passing to date-streaks are all valid date strings. http://momentjs.com/docs/#/parsing/string/`
        )
      : new Date(date)
  );

export const sortDates = dates => {
  return dates
    .sort(function(a, b) {
      return startOfDay(b) - startOfDay(a);
    })
    .reverse();
};
