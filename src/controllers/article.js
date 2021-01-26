const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const TABLE = 'articles';

const create = async (article) => {
  const id = uuidv4();
  let error = '';

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
    error = `Error on posting article: ${err}`;
  }

  return error || newArticle;
};

const get = async (articleId) => {
  let response = {};
  let error = '';

  const params = {
    TableName: TABLE,
    Key: {
      articleId,
    },
  };

  try {
    response = await dynamoDb.get(params).promise();
  } catch (err) {
    error = `Error on getting article: ${err}`;
  }

  return error || response.Item;
};

module.exports = { create, get };
