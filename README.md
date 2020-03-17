# 🗓⚡️ Date Streaks

A package to find streaks from a list of dates.

**Quick example:**

```js
import { summary } from 'date-streaks';

const dates = [
  new Date('01/01/2018'),
  new Date('01/02/2018'),
  new Date('01/04/2018')
];

summary({ dates }) // or summary(dates) -> accepts an array as well;
```

Returns:

```js
{
  currentStreak: 0,
  longestStreak: 2,
  streaks: [ 2, 1 ],
  todayInStreak: false,
  withinCurrentStreak: false
}
```

## Installation

```shell
# with npm:
npm install date-streaks --save

# or with yarn:
yarn add date-streaks
```

## Usage

date-streaks comes with three functions to get various information about streaks throughout a list of dates.

### `summary`

Summary finds streaks within a list of dates and returns the current streak, the longest streak, whether today is in the streak, and whether the current streak is still valid.

The logic for `withinCurrentStreak` is whether today or yesterday appears in the list. Since a user would still be in a streak if they completed an event yesterday and still had yet to complete it today.

#### Example

Let's pretend today is 01/07/2018 for this example:

```js
import { summary } from 'date-streaks';

const dates = [
  new Date('01/01/2018'),
  new Date('01/02/2018'),
  new Date('01/03/2018'),
  new Date('01/06/2018')
];

summary({ dates }); // or summary(dates) -> accepts an array as well
```

Returns:

```js
{
  currentStreak: 1,
  longestStreak: 3,
  streaks: [ 3, 1 ],
  todayInStreak: false,
  withinCurrentStreak: true
}
```

### `streakRanges`

Streak ranges finds the start and end dates of each streak, in addition to the duration of each of the streaks.

#### Example

```js
import { streakRanges } from 'date-streaks';

const dates = [
  new Date('01/01/2018'),
  new Date('01/02/2018'),
  new Date('01/03/2018'),
  new Date('01/06/2018')
];

streakRanges({ dates }); // or streakRanges(dates) -> accepts an array as well
```

Returns:

```js
[
  {
    start: 'Sat Jan 06 2018 00:00:00 GMT-0500',
    end: null,
    duration: 1
  },
  {
    start: 'Mon Jan 01 2018 00:00:00 GMT-0500',
    end: 'Wed Jan 03 2018 00:00:00 GMT-0500',
    duration: 3
  }
];
```

### `trackRecord`

Track record returns a list of dates from a specified date into the past with the provided dates marked as `true`. This is especially helpful for features where you want to show users a calendar of dates where they completed some task.

#### Example

Let's get a track record for the days preceeding 1/13/2018.

```js
import { trackRecord } from 'date-streaks';

const dates = [
  new Date('01/04/2018'),
  new Date('01/05/2018'),
  new Date('01/11/2018'),
  new Date('01/12/2018')
];

// defaults to 7 days
const length = 10;

// defaults to today's date
const endDate = new Date('01/13/2018');


trackRecord({ dates, length, endDate });
```

Returns:

```js
{
  'Wed Jan 13 2018 00:00:00 GMT-0400': false,
  'Tue Jan 12 2018 00:00:00 GMT-0400': true,
  'Mon Jan 11 2018 00:00:00 GMT-0400': true,
  'Sun Jan 10 2018 00:00:00 GMT-0400': false,
  'Sat Jan 09 2018 00:00:00 GMT-0400': false,
  'Fri Jan 08 2018 00:00:00 GMT-0400': false,
  'Thu Jan 07 2018 00:00:00 GMT-0400': false,
  'Wed Jan 06 2018 00:00:00 GMT-0400': false,
  'Tue Jan 05 2018 00:00:00 GMT-0400': true,
  'Mon Jan 04 2018 00:00:00 GMT-0400': true
}
```

## Tests

Tests require `mocha` to be installed globally. In the parent of the package, run

```bash
npm run test
```

## Authors

* Jon Samp

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
