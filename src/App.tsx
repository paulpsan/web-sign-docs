import { BrowserRouter } from 'react-router-dom';
import "./App.scss";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { AppRouter } from './routers/AppRouter';
import { AuthProvider } from './context/AuthContext/AuthContext';
import UserService from "./services/UserService";

/**
 * If the user is not logged in, then log them in. If they are logged in, then render the app.
 * @returns The return value of the function is the return value of the last statement.
 */
function App() {
  return (
    <>
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
