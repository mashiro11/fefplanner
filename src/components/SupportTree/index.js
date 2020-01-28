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

  isBrother = (selected) =>{
    if(selected === 'None') return false
    const charSelected = this.props.characters.find(chr => selected === chr.name)

    const baseCharacter = this.props.characters.find(chr => this.state.baseCharacter === chr.name)
    if(baseCharacter.childDefiner){
      const child = this.props.characters.find(chr => baseCharacter.childName === chr.name)
      if(child.support === charSelected.childName) return true
    }else if(baseCharacter.supportParent){
      if(!charSelected.childDefinerName) return false
      if(baseCharacter.supportParent === charSelected.childDefinerName) return true
    }
    return false
  }
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
                  onFaceClick={this.onFaceClick(character.name, 'SUPPORT', this.partnerList(character))}
                  onEditClick={this.onEditClick(character.name, 'SUPPORT', this.partnerList(character))}/>
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
                      onFaceClick={this.onFaceClick(child.name, 'SUPPORT', this.partnerList(child))}
                      onEditClick={this.onEditClick(child.name, 'SUPPORT', this.partnerList(child))} />
                  </Grid>
              </Grid>
            </div>: null
          }
        { this.state.openSelection ?
          <CharacterSelector
            onSelect={(selected) => () => {
              const charSelected = this.props.characters.find(chr => chr.name === selected)
              const baseCharacter = this.props.characters.find(chr => chr.name === this.state.baseCharacter)
              const message = `Want ${selected} to be ${this.state.baseCharacter}'s ${this.state.supportType === 'FRIEND'? this.state.supportType.toLowerCase():''} support?\n(confirming will undo previous support and inherited skills may also be undone)`
              let proceed = true
              if(selected !== 'None' &&
              (this.isBrother(selected) ||
              charSelected[this.state.supportType.toLowerCase()] !== 'None' ||
              baseCharacter[this.state.supportType.toLowerCase()] !== 'None'))
                proceed = window.confirm(message)
              if(proceed){
                this.props.dispatch({
                  type: 'CHANGE_' + this.state.supportType,
                  remove: selected === 'None',
                  selected: charSelected,
                  baseCharacter: baseCharacter
                })
              }
              this.setState({openSelection: false, baseCharacter: null, supportType: null, options: null})
            }}
            characters={this.props.characters.find(chr => chr.name === this.state.baseCharacter)[this.state.supportType.toLowerCase()] !== 'None'? ['None',...this.state.options]: this.state.options}
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
