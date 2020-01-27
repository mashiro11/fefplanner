import React from 'react'
import { connect } from 'react-redux'

import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Grid from '@material-ui/core/Grid'

import SupportTree from './components/SupportTree'
import CharacterStatus from './components/CharacterStatus'
import background from './background.jpg'

import './App.css'

class App extends React.Component {
  constructor(props){
    super(props)
    const paths = ['all', 'bir', 'con', 'rev']
    this.state = {
      path: 0,
      paths: paths
    }
  }

  pathSelected = (e, newValue) => {
    this.setState({path: newValue})
    this.props.dispatch({type:'CHANGE_PATH', gamePath: this.state.paths[newValue]})
  }

  render() {
    const { characters } = this.props
    const { status } = this.props
    return (
      <div className="App">
        <img src={background} height="200" alt="Fire Emblem: Fates" />
        <h1 className="App-title">Fire Emblem: Fates - Character Support Planner</h1>
        <Tabs value={this.state.path} centered onChange={this.pathSelected}>
          <Tab label={'All Paths'} />
          <Tab label={'Birthright'} />
          <Tab label={'Conquest'} />
          <Tab label={'Revelations'} />
        </Tabs>
        <Grid container justify="center" spacing={24} style={{padding:24}}>
          <Grid item xs={6} sm={3} lg={2} xl={1} key={0}>
            <SupportTree character={this.props.avatar.corrin} />
          </Grid>
          {characters
            .filter( character => character.path === 'all' && character.childDefiner)
            .map((character, index) =>
              <Grid item xs={6} sm={3} lg={2} xl={1} key={index}>
                <SupportTree character={character} />
              </Grid>
          )}
        </Grid>
        <Grid container justify="center" spacing={24} style={{padding:24}}>
          {characters
            .filter( character => character.path === 'all' && !character.childDefiner && !character.isChild)
            .map((character, index) =>
              <Grid item xs={6} sm={3} lg={2} xl={1} key={index}>
                <SupportTree character={character} />
              </Grid>
          )}
        </Grid>
        <Grid container justify="center" spacing={24} style={{padding:24}}>
          {this.props.gamePath === 'bir' || this.props.gamePath === 'rev'?
            characters
            .filter(character => character.path === 'bir' && character.childDefiner)
            .map((character, index) =>
              <Grid item xs={6} sm={3} lg={2} xl={1} key={index}>
                <SupportTree character={character} />
              </Grid>)
          : null }
        </Grid>
        <Grid container justify="center" spacing={24} style={{padding:24}}>
          {this.props.gamePath === 'bir' || this.props.gamePath === 'rev'?
            characters
            .filter(character => character.path === 'bir' && !character.childDefiner && !character.isChild)
            .map((character, index) =>
              <Grid item xs={6} sm={3} lg={2} xl={1} key={index}>
                <SupportTree character={character} />
              </Grid>)
          : null }
        </Grid>
        <Grid container justify="center" spacing={24} style={{padding:24}}>
          {this.props.gamePath === 'con' || this.props.gamePath === 'rev'?
            characters
            .filter( character => character.path === 'con' && character.childDefiner)
            .map((character, index) =>
              <Grid item xs={6} sm={3} lg={2} xl={1} key={index}>
                <SupportTree character={character} />
              </Grid>
            ): null }
        </Grid>
        <Grid container justify="center" spacing={24} style={{padding:24}}>
            {this.props.gamePath === 'con' || this.props.gamePath === 'rev'?
              characters
              .filter( character => character.path === 'con' && !character.childDefiner && !character.isChild)
              .map((character, index) =>
                <Grid item xs={6} sm={3} lg={2} xl={1} key={index}>
                  <SupportTree character={character} />
                </Grid>
              ): null }
        </Grid>
        { status.name ? <CharacterStatus character={characters.find( character => character.name === status.name)} /> : null }
        <div>
          Based on information from:<br/>
            <a href={'www.youtube.com/watch?v=zgg8lt75MrE'}>www.youtube.com/watch?v=zgg8lt75MrE</a><br/>
            <a href={'fireemblem.fandom.com/wiki/List_of_characters_in_Fire_Emblem_Fates'}>fireemblem.fandom.com/wiki/List_of_characters_in_Fire_Emblem_Fates</a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    gamePath: state.gamePath,
    avatar: state.avatar,
    characters: state.characters,
    status: state.status
  }
}

export default connect(mapStateToProps)(App)
