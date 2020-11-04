import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

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
  const [inputs, setInputs] = useState(initialForm)
  const [search, setSearch] = useState(initialForm)
  const [expansions, setExpansions] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [nextPage, setNextPage] = useState('')
  const history = useHistory()

  useEffect(() => {
    if(!isLoaded) {
    axios.get('https://api.magicthegathering.io/v1/sets?type=expansion,core,masters')
      .then (response => {
        // console.log(response)
        setExpansions(response.data.sets)
      })
      .catch(err => console.error(err))
      setIsLoaded(!isLoaded)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearch({...inputs})
    history.push('/cardlist')
  }

  const colorSearch = (searchObject) => {
    return Object.keys(searchObject.colors).reduce((accumulator, color) => {
        const colorBooleans = Object.values(searchObject.colors).filter(boolean => boolean && boolean)       
        if (searchObject.colors[color] && colorBooleans.length === 1) {
          return `c:${color}`
        } else if (searchObject.colors[color]) {
          return accumulator === '' ? `c:${color}` : `c:${color} OR ${accumulator}`
        } else {
          return `${accumulator}`
        }
      },'')
  }

  const typeSearch = (searchObject) => {
    return Object.keys(searchObject.types).reduce((accumulator, type) => {
        const typeBooleans = Object.values(searchObject.types).filter(boolean => boolean && boolean)       
        if(searchObject.types[type] && typeBooleans.length === 1) {
          return `t:${type}`
        } else if (searchObject.types[type]) {
          return accumulator === '' ? `t:${type}` : `t:${type} OR ${accumulator}`
        } else {
          return `${accumulator}`
        }
      },'')
  }

  const getCards = (setString, colorString, typeString) => {
    let pathString = `https://api.scryfall.com/cards/search?q=(${setString})`

    // if(Object.values(search.colors).filter(boolean => boolean && boolean).length > 0) {
    //   pathString = pathString + `(${colorString})`
    // }

    // if(colorString){
    //   pathString += `(${colorString})`
    // }

    colorString && ( pathString += `(${colorString})`)

    if(Object.values(search.types).filter(boolean => boolean && boolean).length > 0) {
      pathString = pathString + `(${typeString})`
    }

    pathString = pathString + `is:booster`
    pathString = pathString + `&order=set`
    // let newCards = []
    axios.get(pathString)
    .then (response => {
      console.log(response.data)
      setCards(response.data.data)
      if(response.data.next_page) {
        setNextPage(response.data.next_page)
      }
      // newCards = response.data.data
    //   if(response.data.has_more) {
    //     setHasMore(true)
    //   }
    //   while(hasMore) {
    //     axios.get(response.data.next_page)
    //     .then (response => {
    //       if(!response.data.has_more) {
    //         setHasMore(false)
    //       }
    //       newCards = [...newCards, ...response.data.data]
    //     })
    //     .catch (err => console.error(err))
    //   }
    })
    .catch (err => console.error(err))
    console.log(cards)
  }


  useEffect(() => {
    if(search.sets.length > 0) {
      const setLiteral = search.sets.reduce((accumulator, set) => {
        if (search.sets.length === 1) {
          return `s:${set}`
        } else {
        return `s:${set} OR ${accumulator}`
        }
      },'')

      const colorLiteral = colorSearch(search)
      const typeLiteral = typeSearch(search)

      getCards(setLiteral, colorLiteral, typeLiteral)
    }
  },[search])

  useEffect(() => {
    if(nextPage) {
      axios.get(nextPage)
      .then(response => {
        console.log(response.data)
        setCards(prevCards => {
          return [...prevCards, ...response.data.data]
        })
        if(response.data.next_page){
          setNextPage(response.data.next_page)
        } else {
          setNextPage('')
        }
      })
      .catch(err => console.error(err))
    } 
}, [nextPage])

  const handleChange = (e, specific) => {
    const {name} = e.target
    const value = e.target.type === 'checkbox' 
      ? e.target.checked 
      : e.target.value
    setInputs(prevInputs => {
      const newInputs = {...prevInputs}
      specific === 'sets' 
        ? newInputs[specific] = [value]
        : newInputs[specific] = {
          ...newInputs[specific],
          [name]: value
        }
      return newInputs
    })
  }

  const handleNewSearch = () => {
    setInputs(initialForm)
  }
  
  return (
    <SearchContext.Provider 
      value={{
        cards,
        setCards,
        expansions,
        setExpansions,
        inputs,
        setInputs,
        search,
        setSearch,
        handleChange,
        handleSubmit,
        handleNewSearch
      }}
    >{props.children}
    </SearchContext.Provider>
  )
}

export {SearchContextProvider, SearchContext}