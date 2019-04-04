import { combineReducers } from 'redux'
import Database from './database.js'
import Images from './images/images.js'

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

const character = (state = {}, action) => {
  let name = state.name + (state.name === 'Corrin' ? '_' +  action.corrinGender :
                           state.name === 'Kana' ? '_' +  action.kanaGender : '')
  switch(action.type){
    case 'SWITCH_GENDER':
      return {...state,
        gender: (state.name === 'Corrin' ? action.corrinGender : action.kanaGender),
        portrait: Images.Portraits[name],
        face: Images.Faces[name]
      }
    default:
      return state
  }
}

const charactersInitialState = Object.values(Database.characters)
                                     .map( (character, index) => {
                                        let name = character.name + ((character.name === 'Corrin' || character.name === 'Kana') ? '_' + character.gender : '')
                                        let portrait = Images.Portraits[name]
                                        let face = Images.Faces[name]
                                        let info = {
                                          name: character.name,
                                          portrait: portrait,
                                          face: face,
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
    case 'CHANGE_SUPPORT':
      return state.map(sT => supportTree(sT, action))
    case 'SWITCH_GENDER':
      return [
        character(state.find( chr => chr.name === 'Corrin'), action),
        character(state.find( chr => chr.name === 'Kana'), action),
        ...state.filter( chr => chr.name !== 'Corrin' && chr.name !== 'Kana')
        ]
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
