import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, TodoPage, SignUpPage, LoginPage } from 'pages';
import { AuthProvider } from 'context/AuthContext';

const basename = process.env.PUBLIC_URL

function App() {
  return (
    <div className="app">
      <BrowserRouter basename={basename}>
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

export default App;
