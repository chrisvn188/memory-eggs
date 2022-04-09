import React from 'react'
import './Modal.css'

export default function Modal({ title, description, btnText, shuffleCards }) {
  return (
    <article className='modal'>
      <div className='content'>
        <h2 className='title'>{title}</h2>
        <p className='description'>{description}</p>
        <button className='btn' onClick={shuffleCards}>
          {btnText}
        </button>
      </div>
    </article>
  )
}
