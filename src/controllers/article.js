const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const { getUpdateData } = require('../utils/utils');

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
    return `Error creating article: ${err}`;
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
    return `Error getting article: ${err}`;
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
    return `Error getting all articles: ${err}`;
  }

  return response.Items;
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
    return `Error deleting article: ${err}`;
  }

  return response;
};

const update = async (articleId, newData) => {
  let response = {};

  const [updateExpression, attributes] = getUpdateData(newData);

  const params = {
    TableName: TABLE,
    Key: {
      articleId,
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: attributes,
    ReturnValues: 'UPDATED_NEW',
  };

  try {
    response = await dynamoDb.update(params).promise();
  } catch (err) {
    return `Error updating article: ${err}`;
  }

  return response;
};

module.exports = {
  create,
  show,
  index,
  destroy,
  update,
};
