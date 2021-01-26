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

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify('Empty Article ID'),
    };
  }

  const result = await articleController.get(id);

  if (!result) {
    return {
      statusCode: 404,
      body: JSON.stringify('Not Found'),
    };
  }

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
