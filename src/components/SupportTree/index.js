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

  constructor(props){
    super(props)
    this.state = {
      openSelection: false,
      options: [],
      gender: props.character.name === 'Corrin'? props.character.gender : ''
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
                                            return found? found.path === this.props.gamePath || found.path === 'all' : false})
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
                  onFaceClick={this.onFaceClick(character.name, 'friend', this.friendList(character))}
                  onEditClick={this.onEditClick(character.name, 'friend', this.friendList(character))}/>
              </Grid>
              <Grid item xs={4} sm={4} lg={4} xl={4}>
                <FaceIcon name={character.name} gender={character.gender}
                  onFaceClick={this.onFaceClick()} />
              </Grid>
              <Grid item xs={4} sm={4} lg={4} xl={4}>
                <FaceIcon name={character.support} edit
                  onFaceClick={this.onFaceClick(character.name, 'partner', this.partnerList(character))}
                  onEditClick={this.onEditClick(character.name, 'partner', this.partnerList(character))}/>
              </Grid>
          </Grid>
          <Typography>
            Child
          </Typography>
          <Grid container direction="row" justify="center" spacing={8} style={{padding:2}}>
              <Grid item xs={4} sm={4} lg={4} xl={4}>
                <FaceIcon name={child.friend} edit
                  onFaceClick={this.onFaceClick(child.name, 'friend', this.friendList(child))}
                  onEditClick={this.onEditClick(child.name, 'friend', this.friendList(child))}/>
              </Grid>
              <Grid item xs={4} sm={4} lg={4} xl={4}>
                <FaceIcon name={child.name} gender={child.gender} onFaceClick={this.onFaceClick()} />
              </Grid>
              <Grid item xs={4} sm={4} lg={4} xl={4}>
                <FaceIcon name={child.support} edit
                  onFaceClick={this.onFaceClick(child.name, 'partner', this.partnerList(child))}
                  onEditClick={this.onEditClick(child.name, 'partner', this.partnerList(child))} />
              </Grid>
          </Grid>
        </Card>
        { this.state.openSelection ?
          <CharacterSelector
            onSelect={(selected) => () => {
              let corrin
              corrin = selected === 'Corrin' ? this.props.characters.find(chr => chr.name === 'Corrin') : null
              corrin = corrin ? corrin : this.state.baseCharacter === 'Corrin' ?
                                         this.props.characters.find(chr => chr.name === 'Corrin') : null
              this.props.dispatch({
                type: 'CHANGE_SUPPORT',
                supportType: this.state.supportType,
                selected: selected === 'Corrin' ? 'Corrin' + '_' + corrin.gender: selected,
                baseCharacter: this.state.baseCharacter === 'Corrin' ? 'Corrin' + '_' + corrin.gender : this.state.baseCharacter
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
    gamePath: state.gamePath,
    avatar: state.avatar,
    characters: state.characters
  }
}

export default connect(mapStateToProps)(SupportTree)
