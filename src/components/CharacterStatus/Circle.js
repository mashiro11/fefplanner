import React from 'react'

const Circle = ({clickable, onClick}) => {
  return(
    <svg style={clickable? {cursor: 'pointer'} : null}
        onClick={onClick? onClick : ()=>{} }
        width='24' height='24' window='0 0 24 24'  fill='none'>
      <circle cx='12' cy='12' strokeWidth='3' r='10' stroke='#EEEEEE'/>
    </svg>
  )
}

export default Circle
