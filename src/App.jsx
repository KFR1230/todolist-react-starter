import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, TodoPage, SignUpPage, LoginPage } from 'pages';
import { AuthProvider } from 'context/AuthContext';
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="signuppage" element={<SignUpPage />} />
            <Route path="todopage" element={<TodoPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
//測試
export default App;
