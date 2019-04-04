import React from 'react'
import { connect } from 'react-redux'
import FaceIcon from '../FaceIcon'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'


const openStatus = (name) => {
  return{
    type: 'OPEN_STATUS',
    name: name
  }
}

class SupportTree extends React.Component {
  faceIconOnClick = (name) => {
    return (e) => {
      if(e.target.title !== 'None'){
        this.props.dispatch(openStatus(name))
      }
    }
  }
  render(){
    const { character } = this.props
    const child = this.props.characters.find( current => current.name === character.childName )
    const onClickCharacter = this.faceIconOnClick(character.name)
    const onClickChild = this.faceIconOnClick(child.name)

    return (
      <Card>
      <CardContent>
        <Typography gutterBottom variant='headline' component='h5'>
          {character.name}
        </Typography>
      </CardContent>
      <Grid container direction="row" justify="center" spacing={8} style={{padding:2}}>
            <Grid item xs={4} sm={4} lg={4} xl={4}>
              <FaceIcon name={character.friend} />
            </Grid>
            <Grid item xs={4} sm={4} lg={4} xl={4}>
              <FaceIcon name={character.name} gender={character.gender} onClick={onClickCharacter}/>
            </Grid>
            <Grid item xs={4} sm={4} lg={4} xl={4}>
              <FaceIcon name={character.support} />
            </Grid>
        </Grid>
        <Typography>
          Child
        </Typography>
        <Grid container direction="row" justify="center" spacing={8} style={{padding:2}}>
            <Grid item xs={4} sm={4} lg={4} xl={4}>
              <FaceIcon name={child.friend} />
            </Grid>
            <Grid item xs={4} sm={4} lg={4} xl={4}>
              <FaceIcon name={child.name} gender={child.gender} onClick={onClickChild} />
            </Grid>
            <Grid item xs={4} sm={4} lg={4} xl={4}>
              <FaceIcon name={child.support} />
            </Grid>
        </Grid>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {
    characters: state.characters
  }
}

export default connect(mapStateToProps)(SupportTree)
