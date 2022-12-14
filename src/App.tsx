import { BrowserRouter } from 'react-router-dom';
import "./App.scss";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { AppRouter } from './routers/AppRouter';
import { AuthProvider } from './context/AuthContext/AuthContext';
import UserService from "./services/UserService";

function App() {
  return (
    <>
      {console.log(UserService.isLoggedIn())}
      {!UserService.isLoggedIn() ? UserService.doLogin() :
        <BrowserRouter>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </BrowserRouter>
      }
    </>
  );
}

export default App;
