import React from 'react'
import { connect } from 'react-redux'
import FaceIcon from '../FaceIcon'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CharacterSelector from '../CharacterSelector'


const openStatus = (name) => {
  return{
    type: 'OPEN_STATUS',
    name: name
  }
}

class SupportTree extends React.Component {

  constructor(){
    super()
    this.state = {
      openSelection: false,
      options: []
    }
  }

  onClick = (options) => {
    return  (e) => {
      if(e.target.title === 'None'){
        this.setState({openSelection: true, options: options})
      }
      else{
        this.props.dispatch(openStatus(e.target.title))
      }
    }
  }

  corrinSupportList = (corrin, support) => {
    const { characters } = this.props
    switch(support){
      case 'friend':
              return characters
                        .filter( chr => chr.gender === corrin.gender &&
                                        chr.name !== corrin.name &&
                                        chr.name != corrin.childName
                                )
                        .map(chr => chr.name)
      case 'partner':
              return characters
                        .filter( chr => chr.gender !== corrin.gender &&
                                        chr.name != corrin.childName
                                )
                        .map(chr => chr.name)
    }
  }

  render(){
    const { character } = this.props
    const child = this.props.characters.find( current => current.name === character.childName )
    const friendList  = character.name === 'Corrin' ? this.corrinSupportList(character, 'friend') : character.supportList.Friend
    const partnerList = character.name === 'Corrin' ? this.corrinSupportList(character, 'partner') : character.supportList.Partner
    return (
      <div>
        <Card>
        <CardContent>
          <Typography gutterBottom variant='headline' component='h5'>
            {character.name}
          </Typography>
        </CardContent>
        <Grid container direction="row" justify="center" spacing={8} style={{padding:2}}>
              <Grid item xs={4} sm={4} lg={4} xl={4}>
                <FaceIcon name={character.friend} onClick={this.onClick(friendList)} />
              </Grid>
              <Grid item xs={4} sm={4} lg={4} xl={4}>
                <FaceIcon name={character.name} gender={character.gender} onClick={this.onClick()} />
              </Grid>
              <Grid item xs={4} sm={4} lg={4} xl={4}>
                <FaceIcon name={character.support} onClick={this.onClick(partnerList)} />
              </Grid>
          </Grid>
          <Typography>
            Child
          </Typography>
          <Grid container direction="row" justify="center" spacing={8} style={{padding:2}}>
              <Grid item xs={4} sm={4} lg={4} xl={4}>
                <FaceIcon name={child.friend} onClick={this.onClick()} />
              </Grid>
              <Grid item xs={4} sm={4} lg={4} xl={4}>
                <FaceIcon name={child.name} gender={child.gender} onClick={this.onClick()} />
              </Grid>
              <Grid item xs={4} sm={4} lg={4} xl={4}>
                <FaceIcon name={child.support} onClick={this.onClick()} />
              </Grid>
          </Grid>
        </Card>
        { this.state.openSelection ?
          <CharacterSelector characters={this.state.options}
            onCancel={()=> this.setState({openSelection: false}) }/>
          :null
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    characters: state.characters
  }
}

export default connect(mapStateToProps)(SupportTree)
