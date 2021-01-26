const articleController = require('./controllers/article');

const createArticle = async (event) => {
  const article = JSON.parse(event.body);

  if (!article) {
    return {
      statusCode: 400,
      body: JSON.stringify('Empty Body'),
    };
  }

  const result = await articleController.create(article);

  if (typeof (result) === 'string') {
    return {
      statusCode: 400,
      body: JSON.stringify(result),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

const getArticle = async (event) => {
  const { id } = event.pathParameters;

  const result = await articleController.get(id);

  if (typeof (result) === 'string') {
    return {
      statusCode: 400,
      body: JSON.stringify(result),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

module.exports = { createArticle, getArticle };
