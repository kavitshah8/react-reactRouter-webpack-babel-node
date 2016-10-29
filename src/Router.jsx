import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Route, Router } from 'react-router';

import HelloWorld from './components/HelloWorld.jsx';
// import Styles from './styles/app.css';

render((
    <Router history={browserHistory}>
        <Route path="/" component={HelloWorld} />
    </Router>
), document.getElementById('app'));
