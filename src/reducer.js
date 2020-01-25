import { combineReducers } from 'redux'
import Database from './database.js'
import Images from './images/images.js'

const supportTree = (state = {}, action) => {
  const id = state.id === undefined ? 0 : 1 + state.id++
  console.log(id)
  switch(action.type){
    case 'CHANGE_FRIEND':
      if(state.name === action.baseCharacter)
        return {
          ...state,
          friend: action.selected
        }
      return state
    case 'CHANGE_PARTNER':
      if(state.name === action.baseCharacter)
        return {
          ...state,
          support: action.selected
        }
      else if(state.name === action.selected)
        return {
          ...state,
          support: action.baseCharacter
        }
      else if(state.support === action.selected)
        return {
          ...state,
          support: 'None'
        }
      return state
    default:
      return state
  }
}

const createCharInfo = (character) => {
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

  let name = character.name
  if(character.name === 'Corrin' || character.name === 'Kana'){
    name = character.name + '_' + character.gender
  }
  info = {...info,
          portrait: Images.Portraits[name],
          face: Images.Faces[name]
          }

  return info
}

const charactersInitialState = Object.values(Database.characters)
                                     .filter( character => character.name !== 'Corrin' && character.name !== 'Kana')
                                     .map( (character, index) => createCharInfo(character) )

const characters = (state = charactersInitialState, action) => {
  switch(action.type){
    case 'CHANGE_FRIEND':
    case 'CHANGE_PARTNER':
      return state.map(sT => supportTree(sT, action))
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

const gamePath = (state = 'all', action) => {
  switch(action.type){
    case 'CHANGE_PATH':
      return action.gamePath
    default:
      return state
  }
}

const avatarInitialState = {
  corrin: createCharInfo(Database.characters['Corrin']),
  kana: createCharInfo(Database.characters['Kana'])
}

const avatar = (state = avatarInitialState, action) =>{
  switch(action.type){
    case 'SWITCH_GENDER':
      let corrin = state.corrin
      let kana = state.kana
      corrin.gender = corrin.gender === 'male' ? 'female' : 'male'
      kana.gender = corrin.gender === 'male' ? 'female' : 'male'

      corrin.portrait = Images.Portraits['Corrin' + '_' + corrin.gender]
      corrin.face = Images.Faces['Corrin' + '_' + corrin.gender]

      kana.portrait = Images.Portraits['Kana' + '_' + kana.gender]
      kana.face = Images.Faces['Kana' + '_' + kana.gender]

      return {corrin, kana}
    default:
      return state
  }
}

const reducer = combineReducers({
  gamePath,
  avatar,
  characters,
  status
})

export default reducer
