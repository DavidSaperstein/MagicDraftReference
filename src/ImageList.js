import React, {useContext} from 'react'
import {SearchContext} from './searchContext'
import CardAnimation from './CardAnimation'
import NavBar from './NavBar'

const ImageList = (props) => {

  const {cards} = useContext(SearchContext)

  return (
    <div>
      {cards.length === 0
        ? (
        <CardAnimation />
        ) : (
          <div>
            <NavBar />
            <div className='card-container'>
              {cards.map(card => {
                console.log(card)
                return <img className='cards' alt={card.name} src={card.image_uris.normal}/>
              })}
            </div>
            <NavBar />
          </div>
        )
      }
    </div>
  )
}

export default ImageList
