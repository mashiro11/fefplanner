import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Grid from '@material-ui/core/Grid'

import Database from './database.js'
import CharacterList from './containers/CharacterList'
import SupportTree from './components/SupportTree'
import CharacterStatus from './components/CharacterStatus'
import background from './background.jpg'

import './App.css'

const addCharacter = (name) => {
  return {
    type: 'ADD_TREE',
    name: name,
  }
}

class App extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      path: 'all',
      allRoutesChildDefiners: ["Corrin", "Azura", "Silas", "Kaze", "Jakob"],
      birRouteChildDefiners: ["Ryoma", "Takumi", "Saizo", "Hinata", "Azama", "Subaki", "Hayato", "Kaden"],
      conRouteChildDefiners: ["Xander", "Leo", "Laslow", "Odin", "Niles", "Arthur", "Benny", "Keaton"],
      birRouteMates: ["Hinoka", "Sakura", "Kagero", "Oboro", "Setsuna", "Hana", "Rinkah", "Orochi", "Reina", "Scarlet", "Yukimura"],
      conRouteMates: ["Camilla", "Elise", "Peri", "Selena", "Beruka", "Effie", "Nyx", "Charlotte", "Flora", "Gunther"],
      revRouteMates: ["Fuuga"],
      allRoutesChild: ["Kana", "Shigure", "Dwyer", "Sophie", "Midori"],
      birRouteChild: ["Shiro", "Kiragi", "Asugi", "Mitama", "Hisame", "Caeldori", "Rhajat", "Selkie"],
      conRouteChild: ["Siegbert", "Forrest", "Soleil", "Ophelia", "Nina", "Percy", "Ignatius", "Velouria"]
    }
  }

  createCharacter = (name) => {
    this.context.store.dispatch(addCharacter(name))
  }

  pathSelected = (e, newValue) => {
    this.setState({path: newValue})
  }

  render() {
    return (
      <div className="App">
        <img src={background} height="200" alt="Fire Emblem: Fates" />
        <h1 className="App-title">Fire Emblem: Fates - Character Planner</h1>
        <Tabs centered onChange={this.pathSelected}>
          <Tab value='bir' label={'Birthright'} />
          <Tab value='con' label={'Conquest'} />
          <Tab value='rev' label={'Revelations'} />
        </Tabs>
        <Grid container justify="center" spacing={24} style={{padding:24}}>
          {this.state.allRoutesChildDefiners.map((character, index) =>
              <Grid item xs={6} sm={3} lg={2} xl={1} key={index}>
                <SupportTree character={Database.characters[character]} />
              </Grid>
          )}
          {this.state.path === 'bir' || this.state.path === 'rev'?
            this.state.birRouteChildDefiners.map((character, index) =>
              <Grid item xs={6} sm={3} lg={2} xl={1} key={index}>
                <SupportTree character={Database.characters[character]} />
              </Grid>
          ): null }
          {this.state.path === 'con' || this.state.path === 'rev'?
            this.state.conRouteChildDefiners.map((character, index) =>
              <Grid item xs={6} sm={3} lg={2} xl={1} key={index}>
                <SupportTree character={Database.characters[character]} />
              </Grid>
            ): null }
        </Grid>
        { undefined ? <CharacterList /> : null }
        { this.props.status.name ? <CharacterStatus character={this.props.status} /> : null }
      </div>
    )
  }
}

App.contextTypes ={
  store: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    characters: state.characters,
    status: state.status
  }
}

const mapDispatchToProps = {
  addCharacter
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
