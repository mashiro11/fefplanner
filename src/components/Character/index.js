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
    //paddingBottom: 300,
  }
}
const Character = (props, context) => {

  /*
    Isso aqui vai pro reducer
  */
  const findName = (name) => {
    var names = {
                fileName: '',
                american: '',
                japan: ''}
    for(var key in Images.Portraits){
      if(key.indexOf(name) > -1){
        names.fileName = key
        const hasMinus = key.indexOf('-')
        if(hasMinus !== -1){
          names.japan = key.substring(0, hasMinus)
          names.american = key.substring(hasMinus+1, key.indexOf('.'))
        }else{
          names.american = key.substring(0, key.indexOf('.'))
          names.japan = names.american
        }
      }
    }
    return names
  }

  const closeStatus = () => {
    context.store.dispatch({type: 'CLOSE_STATUS', name: name.american})
  }

  const name = findName(props.info)
  const wikia = 'http://fireemblem.wikia.com/wiki/' + name.american

  const status = props.info.status
  return(
    <div style={props.style}>
      <Card>
        <CardMedia style={styles.portrait}
                  image={Images.Portraits[name.fileName]}
                   title={name.american}
        />
        <CardContent>
          <Typography gutterBottom variant='headline' component='h2'>
            {name.american}
          </Typography>
        </CardContent>
        <CardContent>
          Japan: {name.japan}
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
