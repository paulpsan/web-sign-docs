import { BrowserRouter } from 'react-router-dom';
import "./App.scss";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { AppRouter } from './routers/AppRouter';
import { AuthProvider } from './context/AuthContext/AuthContext';
import UserService from "./services/UserService";

/**
 * Si el usuario no ha iniciado sesión, regístrelo. Si ha iniciado sesión, renderice la aplicación.
 * @returns El valor de retorno de la función es el valor de retorno de la última instrucción.
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
