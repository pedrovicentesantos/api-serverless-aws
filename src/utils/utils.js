const getUpdateData = (data) => {
  let expression = '';
  const attributes = {};

  Object.keys(data).forEach((key) => {
    if (!expression) expression += `SET ${key} = :${key}`;
    else expression += `, ${key} = :${key}`;
    attributes[`:${key}`] = data[key];
  });

  return [expression, attributes];
};

module.exports = {
  getUpdateData,
};
