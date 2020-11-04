import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import ImageList from './ImageList'
import SearchForm from './SearchForm'
import Home from './Home'
import {SearchContext} from './searchContext'
import './styles.css'

const App = (props) => {
  
  const {inputs} = useContext(SearchContext)

  return (
    <>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>

        <Route exact path='/search'>
          <SearchForm />
        </Route>

        <Route exact path='/cardlist'>
          <ImageList inputs={inputs}/>
        </Route>
      </Switch>
    </>
  )
}

export default App