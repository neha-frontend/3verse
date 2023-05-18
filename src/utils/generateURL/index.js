const generateURL = (payload) => {
  let url = '';

  // remove null values if removeNull is true
  if (payload?.removeNull) {
    for (let [key, value] of Object.entries(payload)) {
      if (value === null || value === 'null') delete payload[key];
    }
    delete payload.removeNull;
  }

  for (const [key, value] of Object.entries(payload)) {
    if (Object.keys(payload)[0] === key) url += `${key}=${value}`;
    else url += `&${key}=${value}`;
  }
  return url;
};

export default generateURL;
