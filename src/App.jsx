import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {HomePage, TodoPage, SignUpPage, LoginPage} from 'pages'
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route  path="login" element={<LoginPage/>}/>
          <Route path="signuppage" element={< SignUpPage/>} />
          <Route path="todopage" element={<TodoPage/>} />
          <Route path="*" element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
