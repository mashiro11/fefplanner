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

const charactersInitialState = Object.values(Database.characters)
                                     .map( (character, index) => {
                                        let info = {
                                          name: character.name,
                                          japanese: character.japanese,
                                          path: character.path,
                                          childDefiner: character.childDefiner,
                                          isChild:character.isChild,
                                          gender: character.gender,
                                          skill: character.skill,
                                          charClass: character.charClass,
                                          friend: 'None',
                                          support: 'None',
                                          grownthRate: character.grownthRate,
                                          maxModifiers: character.maxModifiers,
                                          supportList: character.supportList,
                                          choosenClasses: character.choosenClasses,
                                          choosenSkills: character.choosenSkills
                                        }
                                        if(character.childDefiner){
                                          info = {...info,
                                                  childName: character.child.name }
                                        }
                                        return info
                                      })

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
