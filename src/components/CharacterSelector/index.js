import React from 'react'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

const CharacterSelector = ({onCancel, characters}) => {
  return(
    <Paper>
      <div>
        {characters.map((character, index) => <Button key={index}>{character}</Button>)}
      </div>
      <Button onClick={onCancel}>Cancel</Button>
    </Paper>
  )
}

export default CharacterSelector
