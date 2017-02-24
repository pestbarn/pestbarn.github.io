import { render } from 'react-dom';
import Routes from './config/Router.js';

const app = document.getElementById('app');

render(
    Routes,
    app
);
