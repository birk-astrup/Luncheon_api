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

export const formatDate = incomingDate => {
  const date = new Date(incomingDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
};

// Takes array of new Date()
export const handleCalendarFormating = arr => {
  const obj = {};

  for (let dates in arr) {
    const date = new Date(arr[dates]);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // console.log(year, month, day);

    const nextDay = parseInt(day) + 1;
    const hasNextDay = arr
      .map(dateTimes =>
        new Date(dateTimes).getDate() === nextDay ? true : false,
      )
      .includes(true);

    const dayBefore = day - 1;
    const hasDayBefore = arr
      .map(dateTimes =>
        new Date(dateTimes).getDate() === dayBefore ? true : false,
      )
      .includes(true);

    // Checks if next date is a ending day of a period
    // (e.g. 22, 23, 25 where there is a gap between 23rd to 25th)
    const endingDay = hasNextDay ? nextDay !== day + 1 : true;
    const startingDay = !hasDayBefore ? true : dayBefore !== day - 1;

    obj[
      `${year}-${month.toString().padStart(2, 0)}-${day
        .toString()
        .padStart(2, 0)}`
    ] = {
      startingDay,
      endingDay,
      color: '#5CBDAA',
    };
  }

  return obj;
};
