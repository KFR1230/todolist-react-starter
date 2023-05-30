import axios from 'axios';

const baseUrl = 'https://todo-list.alphacamp.io/api';
const axiosInstance = axios.create({
  baseURL: baseUrl,
});

// 設定headers 並加上在localstorage的token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } //config.headers 來設定 headers
      //key 使用 Authorization
      // value 使用 Bearer 前綴，並帶上 token
    return config;
  },
  (error) => {
    console.log(error);
  },
);

export const getTodos = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/todos`);
    return res.data.data; //需要用 res.data.data 取值才可以拿到我們所有的 todoitem
  } catch (error) {
    console.log('[Get Todos failed]: ', error);
  }
};
export const createTodo = async (payload) => {
  const { title, isDone } = payload;
  try {
    const res = await axiosInstance.post(`${baseUrl}/todos`, {
      title,
      isDone,
    });
    return res.data;
  } catch (error) {
    console.log('[Create Todo failed]: ', error);
  }
};
export const patchTodo = async (payload) => {
  const { title, isDone, id } = payload; // isDone 是 boolean值
  try {
    const res = await axiosInstance.patch(`${baseUrl}/todos/${id}`, {
      title,
      isDone,
    });

    return res.data;
  } catch (error) {
    console.log('[Patch Todos failed]: ', error);
  }
};
export const deleteTodo = async (id) => {
  //因為只有id
  try {
    const res = await axiosInstance.delete(`${baseUrl}/todos/${id}`);
    return res.data;
  } catch (error) {
    console.log('[Delete Todo failrd]: ', error);
  }
};

//baseURL 代表網址中的共用部分，如果我們在一個地方統一設定好 baseURL，未來當伺服器網址有變更時，只需在這裡統一修改就好了。
