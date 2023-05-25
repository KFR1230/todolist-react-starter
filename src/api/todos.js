import axios from 'axios';

const baseUrl = 'http://localhost:3001';

export const getTodos = async () => {
  try {
    const res = await axios.get(`${baseUrl}/todos`);
    return res.data;
  } catch (error) {
    console.log('[Get Todos failed]: ', error);
  }
};
export const createTodo = async (payload) => {
  const { title, isDone } = payload;
  try {
    const res = await axios.post(`${baseUrl}/todos`, {
      title,
      isDone,
    });
    return res.data;
  } catch (error) {
    console.log('[Create Todo failed]: ', error);
  }
};
export const patchTodo = async (payload) => {
  const {title, isDone , id} = payload
  try {
    const res = await axios.patch(`${baseUrl}/todos/${id}`, {
    title,
    isDone
  })
  return res.data
  }catch(error){
    console.log('[Patch Todos failed]: ', error)
  }
  
};
export const deleteTodo = async (id) => {  //因為只有id
  try{
    const res = await axios.delete(`${baseUrl}/todos/${id}`)
  return res.data
  }catch(error){
    console.log('[Delete Todo failrd]: ', error)
  }
  
};

//baseURL 代表網址中的共用部分，如果我們在一個地方統一設定好 baseURL，未來當伺服器網址有變更時，只需在這裡統一修改就好了。
