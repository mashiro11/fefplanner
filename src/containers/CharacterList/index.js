import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Character from '../../components/Character'
import Images from '../../images/images.js'

class CharacterList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      characters: props.characters,
      searchString: ''
    }
  }

  createCharacters = (nameList) => {
    var id = 0
    return (
      nameList.map(name => (
        <Grid item xs={24} sm={6} lg={3} xl={2} key={id++}>
          <Character info={name} />
        </Grid>
      ))
    )
  }

  render() {
    const names = []
    for(var key in Images.Faces) {
      names.push(key)
    }
    return (
      <div>
        <Grid container spacing={24} style={{padding:24}}>
          {this.createCharacters(names)}
        </Grid>
      </div>
    )
  }
}

export default CharacterList
