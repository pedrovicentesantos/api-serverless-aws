const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const TABLE = 'articles';

const create = async (article) => {
  const id = uuidv4();

  const newArticle = {
    articleId: id,
    ...article,
  };

  const params = {
    TableName: TABLE,
    Item: newArticle,
  };

  try {
    await dynamoDb.put(params).promise();
  } catch (err) {
    return `Error on posting article: ${err}`;
  }

  return newArticle;
};

const index = async (articleId) => {
  let response = {};

  const params = {
    TableName: TABLE,
    Key: {
      articleId,
    },
  };

  try {
    response = await dynamoDb.get(params).promise();
  } catch (err) {
    return `Error on getting article: ${err}`;
  }

  return response.Item;
};

const show = async () => {
  let response = {};

  const params = {
    TableName: TABLE,
  };

  try {
    response = await dynamoDb.scan(params).promise();
  } catch (err) {
    return `Error on getting all articles: ${err}`;
  }

  return response;
};

const destroy = async (articleId) => {
  let response = {};
  const params = {
    TableName: TABLE,
    Key: {
      articleId,
    },
  };

  try {
    response = await dynamoDb.delete(params).promise();
  } catch (err) {
    return `Error on deleting article: ${err}`;
  }

  return response;
};

module.exports = {
  create,
  show,
  index,
  destroy,
};
