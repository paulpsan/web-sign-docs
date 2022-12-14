import './index.scss';
import App from './App';
import ReactDOM from 'react-dom';
import UserService from "./services/UserService";
import HttpService from './services/HttpService';

const root = document.getElementById('root');

const renderApp = () => {
  ReactDOM.render( <App />, root );
}
UserService.initKeycloak(renderApp); 

HttpService.configure();