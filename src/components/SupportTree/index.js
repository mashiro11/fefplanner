import React from 'react'
import FaceIcon from '../FaceIcon'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'


const SupportTree = (props) => {

  return (
    <Card>
    <CardContent>
      <Typography gutterBottom variant='headline' component='h5'>
        {props.character.name}
      </Typography>
    </CardContent>
    <Grid container direction="row" justify="center" spacing={8} style={{padding:2}}>
          <Grid item xs={4} sm={4} lg={4} xl={4}>
            <FaceIcon name={props.character.support.Friend} />
          </Grid>
          <Grid item xs={4} sm={4} lg={4} xl={4}>
            <FaceIcon name={props.character.name} />
          </Grid>
          <Grid item xs={4} sm={4} lg={4} xl={4}>
            <FaceIcon name={props.character.support.Partner} />
          </Grid>
      </Grid>
      <Typography>
        Child
      </Typography>
      <Grid container direction="row" justify="center" spacing={8} style={{padding:2}}>
          <Grid item xs={4} sm={4} lg={4} xl={4}>
            <FaceIcon name={props.character.child.support.Friend} />
          </Grid>
          <Grid item xs={4} sm={4} lg={4} xl={4}>
            <FaceIcon name={props.character.child.name} />
          </Grid>
          <Grid item xs={4} sm={4} lg={4} xl={4}>
            <FaceIcon name={props.character.child.support.Partner} />
          </Grid>
      </Grid>
    </Card>
  )
}

export default SupportTree
