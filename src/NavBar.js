import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {SearchContext} from './searchContext'

const NavBar = (props) => {

  const {handleNewSearch} = useContext(SearchContext)

  return (
    <div className='nav-container'>
      <Link to='/' className='nav-buttons'>Home</Link>
      <Link to='search' className='nav-buttons'>Edit Search</Link>
      <Link to='search' className='nav-buttons' onClick={handleNewSearch}>New Search</Link>
    </div>
  )
}

export default NavBar