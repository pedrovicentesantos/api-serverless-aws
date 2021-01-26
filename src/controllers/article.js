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

const get = async (articleId) => {
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

module.exports = { create, get };
