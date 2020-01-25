import React from 'react'
import { connect } from 'react-redux'
import FaceIcon from '../FaceIcon'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'
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
      options: [],
      gender: 'male'
    }
  }

  onSwitchChange = () => {
    this.props.dispatch({type: 'SWITCH_GENDER'})
  }

  onFaceClick = (baseCharacter, supportType, options) => {
    return  (e) => {
      if(e.target.title === 'None'){
        this.setState({openSelection: true, baseCharacter: baseCharacter, supportType: supportType, options: options})
      }
      else{
        this.props.dispatch(openStatus(e.target.title))
      }
    }
  }

  onEditClick = (baseCharacter, supportType, options) => () => this.setState({openSelection: true, baseCharacter: baseCharacter, supportType: supportType, options: options})

  corrinSupportList = (corrin, support) => {
    const { characters } = this.props

    if(support === 'friend')
              return characters
                        .filter( chr => chr.gender === corrin.gender &&
                                        chr.name !== corrin.name &&
                                        chr.name !== corrin.childName
                                )
                        .map(chr => chr.name)
    else if(support === 'partner')
              return characters
                        .filter( chr => chr.gender !== corrin.gender &&
                                        chr.name !== corrin.childName
                                )
                        .map(chr => chr.name)
  }

  render(){
    const { character } = this.props
    const child = this.props.characters.find( current => current.name === character.childName )
    const friendList  = character.name === 'Corrin' ? this.corrinSupportList(character, 'friend') : character.supportList.Friend
    const partnerList = character.name === 'Corrin' ? this.corrinSupportList(character, 'partner') : character.supportList.Partner

    if(character.name !== 'Corrin'){
      const corrin = this.props.characters.find(current => current.name === 'Corrin')
      if((corrin.gender === 'male' &&
         character.gender === 'male' &&
         character.name !== 'Niles') ||
         (corrin.gender === 'female' &&
         character.gender === 'female' &&
         character.name !== 'Rejaht'))
          partnerList.splice(partnerList.indexOf('Corrin'), 1)
      }

    return (
      <div>
        <Card>
        <CardContent>
          <Typography gutterBottom variant='headline' component='h5'>
            {character.name}
          </Typography>
        </CardContent>
        {character.name === 'Corrin' ? <span>{character.gender}</span> : null}
        {character.name === 'Corrin' ? <Switch onChange={this.onSwitchChange}/> : null}
        <Grid container direction="row" justify="center" spacing={8} style={{padding:2}}>
              <Grid item xs={4} sm={4} lg={4} xl={4}>
                <FaceIcon name={character.friend} edit
                  onFaceClick={this.onFaceClick(character.name, 'friend', friendList)}
                  onEditClick={this.onEditClick(character.name, 'friend', friendList)}/>
              </Grid>
              <Grid item xs={4} sm={4} lg={4} xl={4}>
                <FaceIcon name={character.name} gender={character.gender}
                  onFaceClick={this.onFaceClick()} />
              </Grid>
              <Grid item xs={4} sm={4} lg={4} xl={4}>
                <FaceIcon name={character.support} edit
                  onFaceClick={this.onFaceClick(character.name, 'partner', partnerList)}
                  onEditClick={this.onEditClick(character.name, 'partner', partnerList)}/>
              </Grid>
          </Grid>
          <Typography>
            Child
          </Typography>
          <Grid container direction="row" justify="center" spacing={8} style={{padding:2}}>
              <Grid item xs={4} sm={4} lg={4} xl={4}>
                <FaceIcon name={child.friend} edit
                  onFaceClick={this.onFaceClick(child.name, 'friend', child.supportList.Friend)}
                  onEditClick={this.onEditClick(child.name, 'friend', friendList)}/>
              </Grid>
              <Grid item xs={4} sm={4} lg={4} xl={4}>
                <FaceIcon name={child.name} gender={child.gender} onFaceClick={this.onFaceClick()} />
              </Grid>
              <Grid item xs={4} sm={4} lg={4} xl={4}>
                <FaceIcon name={child.support} edit
                  onFaceClick={this.onFaceClick(child.name, 'partner', child.supportList.Partner)}
                  onEditClick={this.onEditClick(child.name, 'partner', partnerList)} />
              </Grid>
          </Grid>
        </Card>
        { this.state.openSelection ?
          <CharacterSelector
            onSelect={(selected) => () => {
              this.props.dispatch({
                type: 'CHANGE_SUPPORT',
                supportType: this.state.supportType,
                selected: selected,
                baseCharacter: this.state.baseCharacter
              })
              this.setState({openSelection: false, baseCharacter: null, supportType: null, options: null})
            }}
            characters={this.state.options}
            onCancel={()=> this.setState({openSelection: false, baseCharacter: null, supportType: null, options: null}) }/>
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
