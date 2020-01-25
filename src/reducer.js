import { combineReducers } from 'redux'
import Database from './database.js'
import Images from './images/images.js'

const supportTree = (state = {}, action) => {
  const id = state.id === undefined ? 0 : 1 + state.id++
  console.log(id)
  switch(action.type){
    case 'CHANGE_SUPPORT':
      if(state.name !== action.baseCharacter && state.name !== action.selected){
        if(action.supportType === 'partner' && state.support === action.selected)
          return {
            ...state,
            support: 'None'
          }
        if(action.supportType === 'friend' && state.friend === action.selected)
          return {
            ...state,
            friend: 'None'
          }
        return state
      }
      if(state.name === action.baseCharacter){
        if(action.supportType === 'partner')
          return{
            ...state,
            support: action.selected
          }
        else if(action.supportType === 'friend')
          return{
            ...state,
            friend: action.selected
          }
      }
      else if(action.supportType === 'partner')
        return{
          ...state,
          support: action.baseCharacter
        }
      break
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
  corrin: charactersInitialState.find( chr => chr.name === 'Corrin'),
  kana: charactersInitialState.find(chr => chr.name === 'Kana')
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
