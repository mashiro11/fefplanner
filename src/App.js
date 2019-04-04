import React from 'react'
import { connect } from 'react-redux'

import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Grid from '@material-ui/core/Grid'

import CharacterList from './containers/CharacterList'
import SupportTree from './components/SupportTree'
import CharacterStatus from './components/CharacterStatus'
import background from './background.jpg'

import './App.css'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      path: 0,
    }
  }

  paths = (num) => {
    const p = ['all', 'bir', 'con', 'rev']
    return p[num]
  }

  pathSelected = (e, newValue) => {
    this.setState({path: newValue})
  }

  render() {
    const { characters } = this.props
    const { status } = this.props
    return (
      <div className="App">
        <img src={background} height="200" alt="Fire Emblem: Fates" />
        <h1 className="App-title">Fire Emblem: Fates - Character Planner</h1>
        <Tabs value={0} centered onChange={this.pathSelected}>
          <Tab value={0} label={'All Paths'} />
          <Tab value={1} label={'Birthright'} />
          <Tab value={2} label={'Conquest'} />
          <Tab value={3} label={'Revelations'} />
        </Tabs>
        <Grid container justify="center" spacing={24} style={{padding:24}}>
          {characters
            .filter( character => character.path === 'all' && character.childDefiner)
            .map((character, index) =>
              <Grid item xs={6} sm={3} lg={2} xl={1} key={index}>
                <SupportTree character={character} />
              </Grid>
          )}
          {this.paths(this.state.path) === 'bir' || this.paths(this.state.path) === 'rev'?
            characters
            .filter(character => character.path === 'bir' && character.childDefiner)
            .map((character, index) =>
              <Grid item xs={6} sm={3} lg={2} xl={1} key={index}>
                <SupportTree character={character} />
              </Grid>)
          : null }
          {this.paths(this.state.path) === 'con' || this.paths(this.state.path) === 'rev'?
            characters
            .filter( character => character.path === 'con' && character.childDefiner)
            .map((character, index) =>
              <Grid item xs={6} sm={3} lg={2} xl={1} key={index}>
                <SupportTree character={character} />
              </Grid>
            ): null }
        </Grid>
        { undefined ? <CharacterList /> : null }
        { status.name ? <CharacterStatus character={characters.find( character => character.name === status.name)} /> : null }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    characters: state.characters,
    status: state.status
  }
}

export default connect(mapStateToProps, {})(App)
