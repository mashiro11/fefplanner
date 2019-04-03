import { combineReducers } from 'redux'
import CharactersData from './database.js'

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

const cleanName = (nameR) => {
  const hasMinus = nameR.indexOf('-')
  const minIndex = hasMinus > 0 ? hasMinus + 1 : 0
  const hasDot = nameR.indexOf('.')
  const maxIndex = hasDot > 0 ? hasDot : nameR.length
  return nameR.substring(minIndex, maxIndex)
}

const getChildName = (parentName) => {
  for(var key in CharactersData){
    if(key.indexOf(parentName) !== -1 ){
      const name = cleanName(CharactersData[key].child.name)
      return name
    }
  }
}

const characters = (state = [], action) => {
  switch(action.type){
    case 'ADD_TREE':
      const childName = getChildName(action.name)
      return [
        ...state,
        {
          id: state.length,
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
