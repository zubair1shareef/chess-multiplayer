import React from 'react'
import { useNavigate } from 'react-router'

function Landing() {
  const navigative = useNavigate()
  return (
    <div>

      <button className='px-8 py-4 text-2xl bg-green-500 text-white font-bold rounded' onClick={()=>navigative('/game')}> play online</button>
    </div>
  )
}

export default Landing