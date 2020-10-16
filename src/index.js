import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {SearchContextProvider} from './searchContext'
import App from './App'

ReactDOM.render(
  <Router>
    <SearchContextProvider>
      <App/>
    </SearchContextProvider>
  </Router>,
  document.getElementById('root')
)