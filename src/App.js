import React, { useState, useEffect, useCallback } from 'react'
import './App.css'
import Modal from './components/Modal'
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
  const [cardOne, setCardOne] = useState(null)
  const [cardTwo, setCardTwo] = useState(null)
  const [turn, setTurn] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)

  const compareCards = useCallback(function (card1, card2) {
    setDisabled(true)
    if (card1.src === card2.src) {
      setCards(prevCards =>
        prevCards.map(card => {
          if (card.src === card1.src) {
            return { ...card, matched: true }
          } else {
            return card
          }
        })
      )
      resetTurn()
    } else {
      setTimeout(() => {
        resetTurn()
      }, 1000)
    }
  }, [])

  useEffect(() => {
    shuffleCards()
  }, [])

  useEffect(() => {
    if (!cards.find(card => card.matched === false)) {
      setIsGameOver(true)
    } else {
      setIsGameOver(false)
    }
  }, [cards])

  useEffect(() => {
    if (cardOne && cardTwo) {
      compareCards(cardOne, cardTwo)
    }
  }, [cardOne, cardTwo, compareCards])

  function shuffleCards() {
    const shuffledCards = [...eggDataList, ...eggDataList]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setCardOne(null)
    setCardTwo(null)
    setDisabled(false)
    setIsGameOver(false)
    setTurn(0)
  }

  function handleChoice(card) {
    cardOne ? setCardTwo(card) : setCardOne(card)
  }

  function resetTurn() {
    setCardOne(null)
    setCardTwo(null)
    setTurn(prevTurn => prevTurn + 1)
    setDisabled(false)
  }

  return (
    <div className='App'>
      <header className='header'>
        <h1 className='title'>Memory Eggs</h1>
        <p className='turn'>Turns: {turn}</p>
      </header>
      <button className='btn' onClick={shuffleCards}>
        New Game
      </button>
      <ul className='cards-list'>
        {cards.map(card => (
          <li key={card.id}>
            <SingleCard
              card={card}
              cover={coverImg}
              handleChoice={handleChoice}
              flipped={card === cardOne || card === cardTwo || card.matched}
              disabled={disabled}
            />
          </li>
        ))}
      </ul>
      {isGameOver && (
        <Modal
          title={'Conglatulation! You won.'}
          description={`You spent ${turn} turns. Play again to get better result.`}
          btnText='Play again'
          shuffleCards={shuffleCards}
        />
      )}
    </div>
  )
}
