import React, {useContext} from 'react'
import {SearchContext} from './searchContext'
import CardAnimation from './CardAnimation'

const SearchForm = (props) => {

  const {expansions, inputs, handleChange, handleSubmit} = useContext(SearchContext)

  return (
    <div className='form-container'>
      {expansions.length === 0 
        ? (
          <CardAnimation />
          ) : (
          <form onSubmit={(e) => handleSubmit(e)} style={{marginBottom: '50px'}}>
            
            <div className='option-container'>
              <h1>Choose a set</h1>
              <select value={inputs.sets[0]} onChange={(e) => handleChange(e, 'sets')}>
                {expansions.map(expansion => 
                  <option 
                    key={expansion.name} 
                    value={expansion.code}
                  >
                    {expansion.name}
                  </option>)
                }
              </select>
            </div>
            
            <div className='option-container'>
              <h1>Choose colors</h1>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                {Object.keys(inputs.colors).map(color => {
                  return (
                    <label>
                      <input
                        key={color}
                        name={color}
                        type='checkbox'
                        checked={inputs.colors[color]}
                        onChange={(e) => handleChange(e, 'colors')}
                      />
                      {` ${color}`} 
                    </label>
                  )
                })}
              </div>
            </div>
            
            <div className='option-container'>
              <h1>Choose types</h1>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                {Object.keys(inputs.types).map(type => {
                  return (
                    <label>
                      <input
                        key={type}
                        name={type}
                        type='checkbox'
                        checked={inputs.types[type]}
                        onChange={(e) => handleChange(e, 'types')}
                      />
                      {` ${type}`}
                    </label>
                  )
                })}
              </div>
            </div>
            <button>Submit</button>
          </form>
        )
      }
    </div>
  )
}

export default SearchForm