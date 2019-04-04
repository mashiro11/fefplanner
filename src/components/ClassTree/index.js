import React from 'react'
import CharClass from '../CharClass'

const ClassTree = (props) => {
  const { classTree } = props
  return(
    <div>
      { classTree.map( (charClass, index) => <CharClass charClass={charClass} charName={props.charName} key={index}/> )}
    </div>
  )
}

export default ClassTree
