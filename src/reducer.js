import { combineReducers } from 'redux'
import Database from './database.js'
import Images from './images/images.js'

//character2 inherits from character1
const inheritedClass = (character1, character2) => {
  if(!character1.charClass[0][0].exclusive){
    if(character1.charClass[0][0].name === 'Villager'){
      if(character2.isChild){
        return character1.charClass[0]
      }
      return character1.charClass[1]
    }else if(character1.charClass[0][0].name !== character2.charClass[0][0].name){
      if(character2.charClass.length > 1 &&
         character1.charClass[0][0].name === character2.charClass[1][0].name){
        return character1.charClass[1]
      }
      return character1.charClass[0]
    }
  }else{
    return character1.charClass[1]
  }
}

const supportTree = (state = {}, action) => {
  action.selected.name = action.selected.name === 'Corrin' ? 'Corrin_' + action.selected.gender: action.selected.name

  switch(action.type){
    case 'CHANGE_FRIEND':
      if(state.name === action.baseCharacter.name){
        return {
          ...state,
          friend: action.selected.name,
          friendClass: action.selected.charClass[0]
        }
      }
      return state
    case 'CHANGE_PARTNER':
      if(action.selected.name === 'None'){

      }else if(state.name === 'Shigure' &&
              ((action.baseCharacter.name === 'Azura' &&
              action.selected.name === 'Jakob') ||
              (action.baseCharacter.name === 'Jakob' &&
              action.selected.name === 'Azura'))){
                const charClass = state.charClass
                charClass[1] = Database.characters['Camilla'].charClass[0]
                return {
                  ...state,
                  charClass: charClass,
                  supportParent: action.selected.name,
                  inheritedClass: inheritedClass(action.selected.name === 'Jakob' ? action.selected : action.baseCharacter, state)
                }
      }else if(state.name === action.baseCharacter.name){
        return {
          ...state,
          support: action.selected.name,
          supportClass: inheritedClass(action.selected, action.baseCharacter)
        }
      }else if(state.name === action.selected.name){
        return {
          ...state,
          support: action.baseCharacter.name,
          supportClass: inheritedClass(action.baseCharacter, action.selected)
        }
      }else if(action.baseCharacter.childDefiner &&
         state.name === action.baseCharacter.childName)
         {
            return{
              ...state,
              supportParent: action.selected.name,
              inheritedClass: inheritedClass(action.selected, state)
            }
      }else if(action.selected.childDefiner &&
              state.name === action.selected.childName){
              return{
                ...state,
                supportParent: action.baseCharacter.name,
                inheritedClass: inheritedClass(action.baseCharacter, state)
              }
      }else if(state.support === action.selected.name){
        //TODO: must undo skill choices based on lost classes
        //return removeSupport(state, action)
        return {
          ...state,
          support: 'None',
          supportClass: null
        }
      }else if(state.supportParent === action.selected.name){
        //return removeInheritance(state, action)
        if(state.name === 'Shigure' &&
          action.selected.name === 'Jakob'){
            console.log('undo')
            const charClass = state.charClass
            charClass[1] = action.selected.charClass[0]
            return{
              ...state,
              charClass: charClass,
              supportParent: 'None',
              inheritedClass: null
            }
        }else
        return {
          ...state,
          supportParent: 'None',
          inheritedClass: null
        }
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
    choosenSkills: character.choosenSkills,
    friendClass: null,
    supportClass: null
  }
  if(character.childDefiner){
    info = {...info,
            childName: character.child.name }
  }
  if(character.isChild){
    info = {...info,
            childDefinerName: character.childDefinerName }
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

      corrin.portrait = Images.Portraits['Corrin_' + corrin.gender]
      corrin.face = Images.Faces['Corrin_' + corrin.gender]

      kana.portrait = Images.Portraits['Kana_' + kana.gender]
      kana.face = Images.Faces['Kana_' + kana.gender]

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
