const tokenKey = 'userToken';

export const setToken = (token) => {
  try {
    localStorage.setItem(tokenKey, token);
  } catch (err) {
    return '';
  }
};

export const getToken = () => {
  try {
    return localStorage.getItem(tokenKey) || '';
  } catch (err) {
    return '';
  }
};
