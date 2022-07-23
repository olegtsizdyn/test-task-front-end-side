import axios from 'axios';

const SERVEL_URL = 'https://test-task-back-end-side.herokuapp.com/api'

export const uploadImageMethod = (data) => {
  return axios.post(
    `${SERVEL_URL}/randomimage`,
    data,
    {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      }
    }
  ).then(response => ({
    status: response.status,
    data: response.data
  }))
  .catch(error => error);
}

export const getImageMethod = () => {
  return axios.get(`${SERVEL_URL}/randomimage`)
  .then(response => ({
    status: response.status,
    data: response.data
  }))
  .catch(error => error);
}