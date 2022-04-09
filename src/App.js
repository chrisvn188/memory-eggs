import React, { useState, useEffect } from 'react'
import './App.css'
import cyanEgg from './images/cyan-egg.png'
import redEgg from './images/red-egg.png'
import blueEgg from './images/blue-egg.png'
import purpleEgg from './images/purple-egg.png'
import orangeEgg from './images/orange-egg.png'
import greenEgg from './images/green-egg.png'
import coverImg from './images/cover.png'
import SingleCard from './components/SingleCard'

const eggDataList = [
  { name: 'cyan egg', src: cyanEgg, matched: false },
  { name: 'red egg', src: redEgg, matched: false },
  { name: 'blue egg', src: blueEgg, matched: false },
  { name: 'purple egg', src: purpleEgg, matched: false },
  { name: 'orange egg', src: orangeEgg, matched: false },
  { name: 'green egg', src: greenEgg, matched: false },
]

export default function App() {
  const [cards, setCards] = useState([])

  useEffect(() => {
    shuffleCards()
  }, [])

  function shuffleCards() {
    const shuffledCards = [...eggDataList, ...eggDataList]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
    setCards(shuffledCards)
  }

  return (
    <div className='App'>
      <h1 className='title'>Memory Eggs</h1>
      <button className='btn' onClick={shuffleCards}>
        New Game
      </button>
      <ul className='cards-list'>
        {cards.map(card => (
          <li>
            <SingleCard card={card} cover={coverImg} />
          </li>
        ))}
      </ul>
    </div>
  )
}
