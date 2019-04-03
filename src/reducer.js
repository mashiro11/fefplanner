import { combineReducers } from 'redux'
import Database from './database.js'

const supportTree = (state = {}, action) => {
  const id = state.id === undefined ? 0 : 1 + state.id++
  console.log(id)
  switch(action.type){
    case 'CHANGE_SUPPORT':
      if(state.name !== action.name){
        return state
      }
      return {
        ...state,
        support: action.support
      }
    default:
      return state
  }
}

const charactersInitialState = Object.keys(Database.characters)
                                     .map( (name, index) => {
                                        return {
                                          name: name,
                                          friend: 'None',
                                          support: 'None'
                                        }})

const characters = (state = charactersInitialState, action) => {
  switch(action.type){
    case 'ADD_TREE':
      return [
        ...state,
        {
          name: action.name,
          friend: 'None',
          support: 'None'
        }
      ]
    case 'CHANGE_SUPPORT':
      return( state.map(sT => supportTree(sT, action)))
    default:
      return(state)
    }
}

const status = (state = {}, action) => {
  switch(action.type){
    case 'OPEN_STATUS':
      return {...state,
         type:'SINGLE_OPENED',
         name: action.name
      }
    case 'CLOSE_STATUS':
      return {}
    default:
      return state
  }
}
const reducer = combineReducers({
  characters,
  status
})

export default reducer
