import React from 'react'
import { connect } from 'react-redux'
import FaceIcon from '../FaceIcon'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
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

  constructor(props){
    super(props)
    this.state = {
      openSelection: false,
      options: []
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

  filterByPath = (characterNameList) => characterNameList ?
                                          characterNameList.filter(current => {
                                            let found = this.props.characters.find(ch => ch.name === current)
                                            return found?
                                                  found.path === this.props.gamePath ||
                                                  found.path === 'all' ||
                                                  this.props.gamePath === 'rev'
                                                  : false})
                                          : []

  friendList = (character) => character.name === 'Corrin' ?
                      this.corrinSupportList(character, 'friend') :
                      this.filterByPath(character.supportList.Friend)

  partnerList = (character) => {
      if(!this.props.characters || !character) return []
      if(character.name === 'Corrin')
        return this.corrinSupportList(character, 'partner')
      else{
        const corrin = this.props.avatar.corrin
        let partnerList = this.filterByPath(character.supportList.Partner)

        if((character.name !== 'Niles' &&
            corrin.gender === 'male' && character.gender === 'male')
            ||
           (character.name !== 'Rhajat' &&
           corrin.gender === 'female' && character.gender === 'female'))
            partnerList = partnerList.filter(current => current !== 'Corrin')
        return partnerList
      }
  }

  render(){
    const { character } = this.props
    const child = character.name === 'Corrin' ?
                  this.props.avatar.kana :
                  this.props.characters.find( current => current.name === character.childName )

    return (
      <Paper style={{fontSize: 10}}>
        {character.name === 'Corrin' ? <span>{character.gender}</span> : null}
        {character.name === 'Corrin' ? <Switch onChange={this.onSwitchChange}/> : null}
        <Grid container direction="row" justify="center" spacing={8} style={{padding:2}}>
              <Grid item xs={4} sm={4} lg={4} xl={4}>
                <div>Friend</div>
                <FaceIcon name={character.friend} edit
                  onFaceClick={this.onFaceClick(character.name, 'FRIEND', this.friendList(character))}
                  onEditClick={this.onEditClick(character.name, 'FRIEND', this.friendList(character))}/>
              </Grid>
              <Grid item xs={4} sm={4} lg={4} xl={4}>
                <FaceIcon name={character.name} gender={character.gender}
                  onFaceClick={this.onFaceClick()} />
              </Grid>
              <Grid item xs={4} sm={4} lg={4} xl={4}>
                <div>Partner</div>
                <FaceIcon name={character.support} edit
                  onFaceClick={this.onFaceClick(character.name, 'PARTNER', this.partnerList(character))}
                  onEditClick={this.onEditClick(character.name, 'PARTNER', this.partnerList(character))}/>
              </Grid>
          </Grid>
          {character.childDefiner?
            <div>
              <Typography>
                Child
              </Typography>
              <Grid container direction="row" justify="center" spacing={8} style={{padding:2}}>
                  <Grid item xs={4} sm={4} lg={4} xl={4}>
                    <div>Friend</div>
                    <FaceIcon name={child.friend} edit
                      onFaceClick={this.onFaceClick(child.name, 'FRIEND', this.friendList(child))}
                      onEditClick={this.onEditClick(child.name, 'FRIEND', this.friendList(child))}/>
                  </Grid>
                  <Grid item xs={4} sm={4} lg={4} xl={4}>
                    <FaceIcon name={child.name} gender={child.gender} onFaceClick={this.onFaceClick()} />
                  </Grid>
                  <Grid item xs={4} sm={4} lg={4} xl={4}>
                    <div>Partner</div>
                    <FaceIcon name={child.support} edit
                      onFaceClick={this.onFaceClick(child.name, 'PARTNER', this.partnerList(child))}
                      onEditClick={this.onEditClick(child.name, 'PARTNER', this.partnerList(child))} />
                  </Grid>
              </Grid>
            </div>: null
          }
        { this.state.openSelection ?
          <CharacterSelector
            onSelect={(selected) => () => {
              this.props.dispatch({
                type: 'CHANGE_' + this.state.supportType,
                selected: this.props.characters.find(chr => chr.name === selected),
                baseCharacter: this.props.characters.find(chr => chr.name === this.state.baseCharacter),
              })
              this.setState({openSelection: false, baseCharacter: null, supportType: null, options: null})
            }}
            characters={this.state.options}
            onCancel={()=> this.setState({openSelection: false, baseCharacter: null, supportType: null, options: null}) }/>
          :null
        }
      </Paper>
    )
  }
}

const mapStateToProps = state => {
  return {
    gamePath: state.gamePath,
    avatar: state.avatar,
    characters: state.characters
  }
}

export default connect(mapStateToProps)(SupportTree)
