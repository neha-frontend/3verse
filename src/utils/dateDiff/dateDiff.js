const dateDiff = date => {
  const timestamp = +new Date(date);
  let d = Math.abs(timestamp - new Date().getTime()) / 1000; // delta
  const result = {}; // result
  const structure = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  Object.keys(structure).forEach(key => {
    result[key] = Math.floor(d / structure[key]);
    d -= result[key] * structure[key];
  });

  const { year, month, week, day, hour, minute, second } = result;

  if (year !== 0) {
    return `${year} ${year === 1 ? 'year' : 'years'} ago`;
  }
  if (month !== 0) {
    return `${month} ${month === 1 ? 'month' : 'months'} ago`;
  }
  if (week !== 0) {
    return `${week} ${week === 1 ? 'week' : 'weeks'} ago`;
  }
  if (day !== 0) {
    return `${day} ${day === 1 ? 'day' : 'days'} ago`;
  }
  if (hour !== 0) {
    return `${hour} ${hour === 1 ? 'hour' : 'hours'} ago`;
  }
  if (minute !== 0) {
    return `${minute} ${minute === 1 ? 'minute' : 'minutes'} ago`;
  }
  if (second !== 0) {
    return `${second} ${second === 1 ? 'second' : 'seconds'} ago`;
  }
  return '';
};

export default dateDiff;
