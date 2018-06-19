const getQueryParamsFromUrl = (url) => {
  const queryObj = {};
  const urlParts = url.split('?');
  if (urlParts.length <= 1) {
    return queryObj;
  }

  const queryString = decodeURIComponent(urlParts[1]);
  queryString.split('&').forEach((queryPart, index) => {
    const [key, value] = queryPart.split('=');
    if (key && value) {
      queryObj[key] = value;
    }
  });

  return queryObj;
}

module.exports = { getQueryParamsFromUrl }