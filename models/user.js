const { getData, setData } = require('./utils');
const { v1: uuidv1 } = require('uuid');

const FILE_NAME = 'users';

const isUniqueUser = async (username) => {
  const data = await getData('users');
  return !data.some((user) => user.username === username);
}

const isValidUser = (username) => {
  const usernameRegex = /[a-z0-9]*[A-Z0-9]*/g;
  return username.match(usernameRegex)
    && username.length >= 6;
}

const isValidDados = ({ username, password, role }) => {
  if (password.length < 8) return false;
  const validRoles = ['funcionario', 'entregador', 'cliente'];
  if (!validRoles.includes(role)) return false;
  if (!isValidUser(username)) return false;
  return true;
}

const addUser = async (obj) => {
  const data = await getData(FILE_NAME);
  const objId = { ...obj, id: uuidv1() };
  const newArray = [...data, objId];
  return setData(FILE_NAME, newArray)
}

const findOne = async ({ username, password }) => {
  const data = await getData(FILE_NAME);
  const user = data.find((obj) => (
    obj.username === username && obj.password === password
  ));
  return (user) ? { username, role: user.role, id: user.id } : user;
}

const findOneById = async ({ id }) => {
  const data = await getData(FILE_NAME);
  const user = data.find((obj) => (
    obj.id === id
  ));
  return (user) ? { username, role: user.role, id: user.id } : user;
}

const User = {
  isValidDados,
  save: addUser,
  findOne,
  findOneById,
  isUniqueUser,
};

module.exports = User;