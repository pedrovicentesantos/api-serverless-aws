const articleController = require('./controllers/article');

const createArticle = async (event) => {
  const article = JSON.parse(event.body);

  if (!article) {
    return {
      statusCode: 400,
      body: JSON.stringify('Empty body'),
    };
  }

  try {
    const result = await articleController.create(article);
    if (typeof (result) === 'string') {
      return {
        statusCode: 400,
        body: JSON.stringify({ Error: result }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ Error: 'Error creating article' }),
    };
  }
};

const getArticle = async (event) => {
  const { id } = event.pathParameters;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify('Empty article ID'),
    };
  }

  try {
    const result = await articleController.index(id);
    if (!result) {
      return {
        statusCode: 404,
        body: JSON.stringify('Not Found'),
      };
    }
    if (typeof (result) === 'string') {
      return {
        statusCode: 400,
        body: JSON.stringify({ Error: result }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ Error: 'Error getting article' }),
    };
  }
};

// eslint-disable-next-line no-unused-vars
const getArticles = async (event) => {
  try {
    const result = await articleController.show();
    if (typeof (result) === 'string') {
      return {
        statusCode: 400,
        body: JSON.stringify({ Error: result }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ Error: 'Error getting articles' }),
    };
  }
};

const deleteArticle = async (event) => {
  const { id } = event.pathParameters;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify('Empty article ID'),
    };
  }

  try {
    const result = await articleController.destroy(id);

    if (!result) {
      return {
        statusCode: 404,
        body: JSON.stringify('Not Found'),
      };
    }
    if (typeof (result) === 'string') {
      return {
        statusCode: 400,
        body: JSON.stringify({ Error: result }),
      };
    }
    return {
      statusCode: 204,
      body: JSON.stringify(result),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ Error: 'Error deleting article' }),
    };
  }
};

const updateArticle = async (event) => {
  const { id } = event.pathParameters;
  const data = JSON.parse(event.body);

  if (!data) {
    return {
      statusCode: 400,
      body: JSON.stringify('Empty body'),
    };
  }

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify('Empty article ID'),
    };
  }

  try {
    const result = await articleController.update(id, data);
    if (typeof (result) === 'string') {
      return {
        statusCode: 400,
        body: JSON.stringify({ Error: result }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ Error: 'Error updating article' }),
    };
  }
};

module.exports = {
  createArticle,
  getArticle,
  getArticles,
  deleteArticle,
  updateArticle,
};
