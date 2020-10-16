import React, {useState, useEffect} from 'react'
import axios from 'axios'
const SearchContext = React.createContext()


const initialForm = {
  sets: [],
  colors: {
    white: false,
    blue: false,
    black: false,
    red: false,
    green: false,
    multicolored: false,
    colorless: false
  },
  types: {
    artifact: false,
    creature: false,
    enchantment: false,
    instant: false,
    land: false,
    sorcery: false
  }
}

const SearchContextProvider = (props) => {

  const [cards, setCards] = useState([])
  const [search, setSearch] = useState(initialForm)
  const [expansions, setExpansions] = useState([])

  useEffect(() => {
    axios.get('https://api.magicthegathering.io/v1/sets?type=expansion,core,masters')
      .then (response => {
        console.log(response)
        setExpansions(response.data.sets)
      })
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    if(search.set) {
      const searchLiteral = search.sets.reduce((set, accumulator) => {
        return `${set}or${accumulator}`
      },'')
      axios.get(`https://api.scryfall.com/cards/search?q=set%3D${searchLiteral}`)
        .then (response => {
          setCards(response.data)
        })
        .catch(err => console.error(err))
      }
  },[search])

  const handleChange = (e, specific) => {
    const {name, value} = e.target
    setSearch
  }

  return (
    <SearchContext.Provider 
      value={{
        cards,
        setCards,
        search,
        setSearch
      }}
    >{props.children}
    </SearchContext.Provider>
  )
}

export {SearchContextProvider, SearchContext}