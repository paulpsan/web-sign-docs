import './index.scss';
import App from './App';
import ReactDOM from 'react-dom';
import UserService from "./services/UserService";
import HttpService from './services/HttpService';

/* Getting the root element from the index.html file. */
const root = document.getElementById('root');

/**
 * The renderApp function is a function that renders the App component to the root element.
 */
const renderApp = () => {
  ReactDOM.render( <App />, root );
}
/* Initializing the Keycloak service and then calling the renderApp function. */
UserService.initKeycloak(renderApp); 

/* Configuring the HttpService to use the Keycloak token. */
HttpService.configure();