import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Notes from './components/Notes';
import CreateNote from './components/CreateNote';
import UpdateNote from './components/UpdateNote';
import './Notes.css';
import * as serviceWorker from './serviceWorker';
ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={Notes} />
            <Route path='/create' component={CreateNote} />
            <Route path='/update/:id' component={UpdateNote} />
        </div>
    </Router>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
