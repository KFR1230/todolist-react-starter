import axios from 'axios';

const authURL = 'https://todo-list.alphacamp.io/api/auth';

export const login = async ({ username, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/login`, {
      username,
      password,
    }); //從後端資料取得data資料
    const { authToken } = data; //若成功是可以拿到一組authToken的資料

    if (authToken) {
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    console.error('[Login Failed]:', error);
  }
};

export const register = async ({ username, email, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/register`, {
      username,
      email,
      password,
    });
    const { authToken } = data;
    if (authToken) {
      return { success: true, ...data };
    }

    return data;
  } catch (error) {
    console.error('[Register Failed]: ', error);
  }
};

//checkPermission功能
export const checkPermission = async ( authToken ) => {
  try {
    const res = await axios.get(`${authURL}/test-token`, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    return res.data.success;
  } catch (error) {
    console.log('[CheckPermission Failed]: ', error);
  }
};
