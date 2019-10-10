// PRIVATE
//////////////////////////
const _randomizeDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
};

// Public
///////////////////////
export const createArrayOfDates = amount => {
  let array = [];
  for (let i = 0; i < amount; i++) {
    array.push(_randomizeDate(new Date(2019, 9, 1), new Date(2019, 9, 31)));
  }

  array.sort((a, b) => {
    var c = new Date(a);
    var d = new Date(b);
    return c - d;
  });

  return array;
};

export const formatDate = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
};

// Takes array of new Date()
export const handleCalendarFormating = arr => {
  const obj = {};

  for (let dates in arr) {
    const year = arr[dates].getFullYear();
    const month = arr[dates].getMonth() + 1;
    const day = arr[dates].getDate();

    const nextDay = arr[parseInt(dates) + 1];
    const hasNextDay = arr.includes(nextDay);

    const dayBefore = arr[dates - 1];
    const hasDayBefore = arr.includes(dayBefore);

    // Checks if next date is a ending day of a period
    // (e.g. 22, 23, 25 where there is a gap between 23rd to 25th)
    const endingDay = hasNextDay ? nextDay.getDate() !== day + 1 : true;
    const startingDay = !hasDayBefore ? true : dayBefore.getDate() !== day - 1;

    obj[`${year}-${month}-${day}`] = {
      startingDay,
      endingDay,
      color: '#5CBDAA',
    };
  }

  return obj;
};
