import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

import TextField from '@material-ui/core/TextField'


import CharacterList from './containers/CharacterList'
import SupportTreeList from './containers/SupportTreeList'
import CharacterStatus from './components/CharacterStatus'
import Status from './components/Status'
import background from './background.jpg'

import './App.css'

class App extends React.Component {
  constructor(){
    super()
  }
  render() {
    return (
      <div className="App">
        <img src={background} height="200" alt="Fire Emblem: Fates" />
        <h1 className="App-title">Fire Emblem: Fates - Character Planner</h1>
        <TextField style={{padding: 24}}
                    id="searchInput"
                    placeholder="Search for Character"
                    margin="normal"
                    onChange={this.onSearchInputChange}
        />
        <SupportTreeList />
        <CharacterList />
        <CharacterStatus />
      </div>
    );
  }
}

export default App;
