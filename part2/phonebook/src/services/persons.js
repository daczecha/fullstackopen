import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseUrl);
}

const create = newObject => {
  return axios.post(baseUrl, newObject);
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`);
}

const replace = (id,newNumber) => {
    return axios.put(`${baseUrl}/${id}`, newNumber);
}


const personsService = {getAll, create, remove, replace};

export default personsService;