import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (body) => {
  const response = await axios.post(baseUrl, body);
  return response.data;
};

const anecdoteServices = { getAll, createNew };
export default anecdoteServices;
