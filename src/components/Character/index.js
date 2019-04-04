import React from 'react'
import { connect } from 'react-redux'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import ClassTree from '../ClassTree'

const styles={
  portrait:{
    top:0,
    left:0,
    minWidth: 100,
    minHeight: 100,
    maxWidth: 100,
    maxHeight: 100
  },
  content:{
    padding: '10px'
  }
}

const switchGender = (corrinGender, kanaGender) => {
  return {
    type: 'SWITCH_GENDER',
    corrinGender: corrinGender,
    kanaGender: kanaGender
  }
}

const Character = ({ character, dispatch }) => {
  const switchGenderOnClick = () => {
    let oldGender = character.gender
    let newGender = (character.gender === 'male' ? 'female' : 'male')
    dispatch(switchGender(newGender, oldGender))
  }


  const wikia = 'http://fireemblem.wikia.com/wiki/' + character.name
  return(
    <div>
      <Card>
        <CardMedia style={styles.portrait}
                   image={character.portrait}
                   title={character.name}
        />
        <CardContent style={styles.content}>
          {character.name === 'Corrin' ?
            <Button onClick={switchGenderOnClick}>Set {character.gender === 'male'? 'female':'male'}</Button> : null
          }
          <Button size="small" color="primary" href={wikia}>
            <Typography gutterBottom variant='headline' title={character.name + ' wikia'}>
              {character.name}
            </Typography>
          </Button>
          <div>Classes</div>
          { character.charClass.map( (classTree, index) =>
            <ClassTree classTree={classTree} charName={character.name} key={index}/>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

const mapStateToProps = state => {
  return{
    status: state.status
  }
}
export default connect(mapStateToProps)(Character)
