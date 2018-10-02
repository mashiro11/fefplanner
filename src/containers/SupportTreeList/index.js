import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import SupportTree from '../../components/SupportTree'
import Images from '../../images/images.js'
import CharactersData from '../../components/Character/characterData.js'

const addTree = (name) => {
  return {
    type: 'ADD_TREE',
    name: name,
  }
}

class SupportTreeList extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      childDefinerNames: ["Kamui", "Azura", "Silas", "Kaze", "Jakob"],
      characters: props.characters,
      images: props.images,
      searchString: ''
    }
    this.createTrees(this.state.childDefinerNames)
  }

  createTrees = (nameList) => {
    nameList.map(currentName => {
      this.context.store.dispatch(addTree(currentName))
    })
  }

  treeList = (nameList) => {
    return(
      nameList.map(currentCharacter => (
        <Grid item xs={12} sm={6} lg={3} xl={2} key={currentCharacter.id}>
          <SupportTree character={currentCharacter} />
        </Grid>
      ))
    )
  }

  render() {
    const names = []
    for(var key in Images['Portraits']) {
      names.push(key)
    }
    return (
      <div>
        <Grid container justify="center" spacing={24} style={{padding:24}}>
          {this.treeList(this.context.store.getState().supportTreeList)}
        </Grid>
      </div>
    )
  }
}

SupportTreeList.contextTypes ={
  store: PropTypes.object
}

const mapStateToProps = (state) => {
  console.log(`State: ${state}`)
  return {
    supportTreeList: state.supportTreeList
  }
}

const mapDispatchToProps = {
  addTree: addTree
}

export default connect(mapStateToProps, mapDispatchToProps)(SupportTreeList)
