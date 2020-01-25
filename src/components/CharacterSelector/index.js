import React from 'react'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

class CharacterSelector extends React.Component{
  render(){
    const {onSelect, onCancel, characters} = this.props
    return(
      <Paper>
        <div>
          {characters.map((character, index) => <Button key={index} onClick={onSelect(character)}>{character}</Button>)}
        </div>
        <Button onClick={onCancel}>Cancel</Button>
      </Paper>
    )
  }
}
export default CharacterSelector
