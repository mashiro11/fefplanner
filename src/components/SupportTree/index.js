import React from 'react'
import { PropTypes } from 'prop-types'
import FaceIcon from '../FaceIcon'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'


const SupportTree = (props) => {

  return (
    <Card>
    <CardContent>
      <Typography gutterBottom variant='headline' component='h5'>
        {props.character.name}
      </Typography>
    </CardContent>
    <Grid container direction="row" justify="center" spacing={8} style={{padding:10}}>
          <Grid item xs={3} sm={3} lg={3} xl={3}>
            <FaceIcon name={props.character.friend} />
          </Grid>
          <Grid item xs={3} sm={3} lg={3} xl={3}>
            <FaceIcon name={props.character.name} />
          </Grid>
          <Grid item xs={3} sm={3} lg={3} xl={3}>
            <FaceIcon name={props.character.support} />
          </Grid>
      </Grid>
      <Typography>
        Child
      </Typography>
      <Grid container direction="row" justify="center" spacing={8} style={{padding:10}}>
          <Grid item xs={3} sm={3} lg={3} xl={3}>
            <FaceIcon name={props.character.childFriend} />
          </Grid>
          <Grid item xs={3} sm={3} lg={3} xl={3}>
            <FaceIcon name={props.character.childName} />
          </Grid>
          <Grid item xs={3} sm={3} lg={3} xl={3}>
            <FaceIcon name={props.character.childSupport} />
          </Grid>
      </Grid>
    </Card>
  )
}

export default SupportTree
