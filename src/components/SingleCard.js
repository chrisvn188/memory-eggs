import React from 'react'
import './SingleCard.css'

export default function SingleCard({ card, cover }) {
  return (
    <article className='card'>
      <div>
        <img src={card.src} alt={card.name} className='front' />
        <img src={cover} alt='Low poly cover' className='back' />
      </div>
    </article>
  )
}
