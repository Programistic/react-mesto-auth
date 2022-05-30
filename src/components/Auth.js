export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then(getResponseData)
};

const getResponseData = (res) => {
  return res.ok ? res.json() : res.json().then((res) => {
    Promise.reject(`Error ${res.status}`)
  }) 
}