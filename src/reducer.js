import { combineReducers } from 'redux'
import characters from './reducers/characters.js'
import gamePath from './reducers/gamePath.js'
import status from './reducers/status.js'

const reducer = combineReducers({
  gamePath,
  characters,
  status
})

export default reducer
