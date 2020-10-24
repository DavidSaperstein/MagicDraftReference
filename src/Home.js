import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {

  return (
    <div 
      style={{
        marginTop: '5vh',
        backgroundColor: '#776871'
      }}>
      <div  
        style={{
          display: 'flex', 
          justifyContent: 'center'
        }}
      >
        <h1 
          style={{
            height: '5vh', 
            fontSize: '3em', 
            color: '#311F0C',
            textDecoration: 'underline'
          }}
        >
          Quick Draft Reference Guide
        </h1>
      </div>
      <div 
        style={{
          display: 'flex', 
          justifyContent: 'space-around', 
          alignItems: 'center',
          height: '70vh'
        }}
      >
        <div 
          style={{
            border: 'black solid 1px',
            borderRadius: '2%',
            width: '40vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#91A8A4',
            padding:'1vw'
          }}
        >
          <p style={{fontSize: '2em',}}>
            I chose this as a portfolio piece, because I wanted to build an app that let a magic player quickly see what could be in their opponent's decks during a draft. This is something I would actually use, and it presents my understanding of APIs and site routing.
          </p>
        </div>
        <div 
          style={{
            width: '40vw', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
          }}
        >
          <Link 
            to='/search'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '20vw',
              height: '10vw',
              fontSize: '2em',
              backgroundColor: '#91A8A4',
              textDecoration: 'none',
              color: 'black',
              textAlign: 'center',
              border: 'black solid 1px',
              borderRadius: '2%'
            }}
          >
            Click here to find cards!
          </Link>
        </div>
      </div>
    </div>
  )

}

export default Home