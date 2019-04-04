import React from 'react'
import { PropTypes } from 'prop-types'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Images from '../../images/images.js'

const styles={
  portrait:{
    position: 'relative',
    top:0,
    left:0,
    width: 200,
    height: 300
  }
}
const Character = (props, context) => {

  const { character } = props

  const closeStatus = () => {
    context.store.dispatch({type: 'CLOSE_STATUS', name: character.name})
  }
  const wikia = 'http://fireemblem.wikia.com/wiki/' + character.name
  return(
    <div style={props.style}>
      <Card>
        <CardMedia style={styles.portrait}
                   image={Images.Portraits[character.name]}
                   title={character.name}
        />
        <CardContent>
          <Typography gutterBottom variant='headline' component='h2'>
            {character.name}
          </Typography>
        </CardContent>
        <CardContent>
          Japan: {character.japanese}
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" href={wikia}>
            View in Fire Emblem Wikia
          </Button>
        </CardActions>
        <CardActions>
          <Button size="small" color="primary" onClick={closeStatus}>
            Close
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

Character.contextTypes = {
  store: PropTypes.object
}
export default Character
