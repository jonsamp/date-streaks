import moment from "moment";

export const relativeDates = {
  today: moment().startOf("day"),
  yesterday: moment()
    .subtract(1, "days")
    .startOf("day"),
  tomorrow: moment()
    .add(1, "days")
    .startOf("day")
};

export const filterInvalidDates = dates =>
  dates.filter(date =>
    !moment(date).isValid()
      ? console.error(
          `The date '${date}' is not in a valid date format and date-streaks is ignoring it. Browsers do not consistently support this and this package's results may fail. Verify the array of dates you're passing to date-streaks are all valid date strings. http://momentjs.com/docs/#/parsing/string/`
        )
      : moment(date)
  );

export const sortDates = dates => {
  return dates
    .sort(function(a, b) {
      return (
        moment(moment(b).startOf("day")).format("X") -
        moment(moment(a).startOf("day")).format("X")
      );
    })
    .reverse();
};
