import { getTodo } from 'api/todos';
import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useEffect, useState } from 'react';
import { getTodos, createTodo, patchTodo, deleteTodo } from 'api/todos';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const total = todos.length;
  const navigate = useNavigate();
  const { isAuthentical, currentMember } = useAuth();

  const handleChange = (value) => {
    setInputValue(value);
  };

  const handleAddTodo = async () => {
    if (inputValue.length === 0) {
      return;
    }
    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id, //在後端資料庫 會自動建立id
            title: data.title,
            isDone: data.isDone,
          },
        ];
      }); //將輸入的值與idDone的變化參數 傳給後端資料庫 做修正
      //  接著回傳出新的todos資料data 之後用setTodos比對data 對todos進行覆蓋資料
      setInputValue('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = async () => {
    if (inputValue.length === 0) {
      return;
    }
    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id, //在後端資料庫 會自動建立id
            title: data.title,
            isDone: data.isDone,
          },
        ];
      });

      setInputValue('');
    } catch (error) {
      console.log(error);
    }
  };

  //id 是來自callback上來的todo.id
  const handleToggleDone = async (id) => {
    try {
      const currentTodo = todos.find((todo) => todo.id === id);
      await patchTodo({
        id,
        isDone: !currentTodo.isDone,
      });
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              isDone: !todo.isDone,
            };
          }
          return todo;
        });
      }); // 將isDone變化的布林值 傳至資料庫做更改 而在本地也進行特定id的修改 並不是像create 拿回傳的值 把全部資料重新覆蓋
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeMode = ({ id, isEdit }) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit,
          };
        }
        return { ...todo, isEdit: false };
      });
    });
  };

  const handleSave = async ({ id, title }) => {
    try {
      await patchTodo({
        id,
        title,
      });
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              title,
              isEdit: false,
            };
          }
          return todo;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async ({ id }) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        const todos = await getTodos();
        setTodos(
          todos.map((todo) => ({
            ...todo,
            isEdit: false,
          })),
        ); //到後端伺服器獲取資料後 設定新的資料讓todos記錄
      } catch (error) {
        console.log(error);
      }
    };
    getTodosAsync();
  }, []);

  useEffect(() => {
    if (!isAuthentical) {
      navigate('/login');
    }
  }, [navigate, isAuthentical]);

  // useEffect(()=>{},[])
  //currentMember?.name 若currentMember存在則取 currentMember.name
  return (
    <div>
      TodoPage
      <Header username={currentMember?.name} />
      <TodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyDown={handleKeyDown}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleDone}
        onChangeMode={handleChangeMode}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <Footer total={total} />
    </div>
  );
};

export default TodoPage;
