import React from 'react'
import Paper from '@material-ui/core/Paper'
import CharClass from '../CharClass'

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto'
  }
}
const ClassTree = (props) => {
  const { classTree } = props
  return(
    <Paper style={styles.container}>
      { classTree.map( (charClass, index) =>
        <CharClass charClass={charClass} onSkillClick={props.onSkillClick} charName={props.charName} charSex={props.charSex} key={index}/>
      )}
    </Paper>
  )
}

export default ClassTree
