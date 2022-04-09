import React from 'react'
import './SingleCard.css'

export default function SingleCard({
  card,
  cover,
  handleChoice,
  flipped,
  disabled,
}) {
  function handleClick() {
    if (!disabled) {
      handleChoice(card)
    }
  }

  return (
    <article className='card'>
      <div className={flipped ? 'flipped' : ''}>
        <img src={card.src} alt={card.name} className='front' />
        <img
          src={cover}
          alt='Low poly cover'
          className='back'
          onClick={handleClick}
        />
      </div>
    </article>
  )
}
