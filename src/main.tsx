import './index.scss';
import App from './App';
import ReactDOM from 'react-dom';
import UserService from "./services/UserService";
import HttpService from './services/HttpService';
import { RestrictedAccess } from './UI/components/RestrictedAccess/RestrictedAccess';

/* Obtener el elemento raíz del archivo index.html. */
const root = document.getElementById('root');

/**
 * La función renderApp es una función que representa el componente de la aplicación en el elemento raíz.
 */
const renderApp = () => {
  ReactDOM.render( <App />, root );
}
const renderNoAccess = () => {
  ReactDOM.render( <RestrictedAccess/>, root)
}
/* Inicializar el servicio Keycloak y luego llamar a la función renderApp. */
UserService.initKeycloak(renderApp, renderNoAccess); 

/* Configurando HttpService para usar el token Keycloak. */
HttpService.configure();