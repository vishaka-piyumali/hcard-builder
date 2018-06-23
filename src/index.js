import React from 'react';
import ReactDOM from 'react-dom';

import './App.css';

import HCardBuilder from './components/HCardBuilder/HCardBuilder';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<HCardBuilder />, document.getElementById('root'));
registerServiceWorker();
