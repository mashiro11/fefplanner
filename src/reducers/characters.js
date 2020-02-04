import Database from '../database.js'
import Images from '../images/images.js'
//character2 inherits from character1
const inheritedClass = (character1, character2) => {
  if(!character1.charClass[0][0].exclusive){
    if(character1.charClass[0][0].name === 'Villager' ||
      character1.charClass[0][0].name === 'NohrPrinc'){
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

  if(!action.remove)
    action.selected.name = action.selected.name === 'Corrin' ?
                            'Corrin_' + action.selected.sex
                            : action.selected.name
  switch(action.type){
    case 'CHANGE_FRIEND':
      if(action.remove){
        return {
            ...state,
            friend: 'None',
            friendClass: null
        }
      }
      if(state.name === action.baseCharacter.name){
        return {
          ...state,
          friend: action.selected.name,
          friendClass: action.selected.charClass[0]
        }
      }
      return state
    case 'CHANGE_SUPPORT':
      if(action.remove){
        //undo special Azura + Joker -> Shigure case
        if(state.name === 'Shigure' &&
          action.baseCharacter.name === 'Azura' &&
          state.supportParent === 'Jakob'){
            const charClass = state.charClass
            //gives troubadour/butler class
            charClass[1] = Database.characters['Jakob'].charClass[0]
            return{
              ...state,
              charClass: charClass,
              supportParent: 'None',
              inheritedClass: null
            }
        }
        else if(state.name === action.baseCharacter.name){
          return{
            ...state,
            support: 'None',
            supportClass: null,
          }
        }else if(state.name === action.baseCharacter.support){
          return{
            ...state,
            support: 'None',
            supportClass: null,
          }
        }
        else if(state.childDefinerName === action.baseCharacter.name){
          return {
            ...state,
            inheritedClass: null,
            supportParent: null
          }
        }
        else if(state.supportParent === action.baseCharacter.name){
          return {
            ...state,
            inheritedClass: null,
            supportParent: null
          }
        }
        return state
      }
      //special Azura + Joker -> Shigure case
      if(state.name === 'Shigure' &&
              ((action.baseCharacter.name === 'Azura' &&
              action.selected.name === 'Jakob') ||
              (action.baseCharacter.name === 'Jakob' &&
              action.selected.name === 'Azura'))){
                const charClass = state.charClass
                //gives wyvernrider class
                charClass[1] = Database.characters['Camilla'].charClass[0]
                return {
                  ...state,
                  charClass: charClass,
                  supportParent: action.selected.name,
                  inheritedClass: inheritedClass(action.selected.name === 'Jakob' ? action.selected : action.baseCharacter, state)
                }
      }//characters directly related to support choice
      else if(state.name === action.baseCharacter.name){
        return {
          ...state,
          support: action.selected.name,
          supportClass: inheritedClass(action.selected, action.baseCharacter),
          //erase parent, if forbidden
          supportParent: action.selected.isChild && action.selected.childDefinerName === state.supportParent? null : state.supportParent,
          inheritedClass: action.selected.isChild && action.selected.childDefinerName === state.supportParent? null : state.inheritedClass,
        }
      }else if(state.name === action.selected.name){
        return {
          ...state,
          support: action.baseCharacter.name,
          supportClass: inheritedClass(action.baseCharacter, action.selected),
          //erase parent, if forbidden
          supportParent: action.baseCharacter.isChild && action.baseCharacter.childDefinerName === state.supportParent? null : state.supportParent,
          inheritedClass: action.baseCharacter.isChild && action.baseCharacter.childDefinerName === state.supportParent? null : state.inheritedClass
        }
      }
      //parent support needs to propagate information to children
      else if(action.baseCharacter.childDefiner &&
         state.name === action.baseCharacter.childName)
         {
            return{
              ...state,
              supportParent: action.selected.name,
              inheritedClass: inheritedClass(action.selected, state),
              //erase support, if forbidden
              support: action.selected.childDefiner && action.selected.childName === state.support ? 'None' : state.support
            }
      }else if(action.selected.childDefiner &&
              state.name === action.selected.childName){
              return{
                ...state,
                supportParent: action.baseCharacter.name,
                inheritedClass: inheritedClass(action.baseCharacter, state),
                //erase support, if forbidden
                support: action.baseCharacter.childDefiner && action.baseCharacter.childName === state.support ? 'None' : state.support
              }
      }//setting brothers as partner support need parent support undone
      else if(state.childDefiner &&
              state.childName === action.baseCharacter.name){
                if(action.selected.isChild && action.selected.childDefinerName === state.support){
                  return{
                    ...state,
                    supportClass: null,
                    support: 'None'
                  }
                }
                return state
      }else if(state.childDefiner &&
              state.childName === action.selected.name){
                if(action.baseCharacter.isChild && action.baseCharacter.childDefinerName === state.support){
                  return{
                    ...state,
                    supportClass: null,
                    support: 'None'
                  }
                }
      }//non related character has partner stolen
      else if(state.support === action.selected.name &&
              action.baseCharacter.name !== state.name){
        return {
          ...state,
          support: 'None',
          supportClass: null
        }
      }else if(state.support === action.baseCharacter.name &&
              action.selected.name !== state.name){
        return {
          ...state,
          support: 'None',
          supportClass: null
        }
      }//non related child has parent stolen
      else if(state.supportParent === action.baseCharacter.name ||
              state.supportParent === action.selected.name){
        if(state.name === 'Shigure' &&
          action.selected.name === 'Jakob'){
            const charClass = state.charClass
            charClass[1] = action.selected.charClass[0]
            return{
              ...state,
              charClass: charClass,
              supportParent: 'None',
              inheritedClass: null
            }
        }
        return{
          ...state,
          supportParent: null,
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
    sex: character.sex,
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
    name = character.name + '_' + character.sex
  }
  info = {...info,
          portrait: Images.Portraits[name],
          face: Images.Faces[name]
          }

  return info
}

const charactersInitialState = Object.values(Database.characters)
                                     //.filter( character => character.name !== 'Corrin' && character.name !== 'Kana')
                                     .map( (character, index) => createCharInfo(character) )

const corrinPath = (corrin, action) => {
  switch(action.gamePath){
    case 'all':
      return{
        ...corrin,
        charClass: [[corrin.charClass[0][0]]]
      }
    case 'bir':
      return{
        ...corrin,
        charClass: [[corrin.charClass[0][0], Database.classes['HoshidoNoble']]]
      }
    case 'con':
      return{
        ...corrin,
        charClass: [[corrin.charClass[0][0], Database.classes['NohrNoble']]]
      }
    case 'rev':
      return{
        ...corrin,
        charClass: [[corrin.charClass[0][0], Database.classes['NohrNoble'], Database.classes['HoshidoNoble']]]
      }
    default:
      return corrin
  }
}

const addCorrinClass = (corrin, className) => {
  let addedClasses = [className, ...Database.classes[className].promotedClasses]
  addedClasses = addedClasses.filter( className => !Database.classes[className].sex || corrin.sex === Database.classes[className].sex)
                                    .map(className => Database.classes[className])
  return{
    ...corrin,
    charClass: [corrin.charClass[0], addedClasses]
  }
}

const characters = (state = charactersInitialState, action) => {
  let corrin
  let corrinPartner
  let partnerChild
  let kanaIndex
  let kana
  let kanaPartner
  let newState = state.slice()
  switch(action.type){
    case 'CHANGE_PATH':
      return state.map( chr => chr.name === 'Corrin' ? corrinPath(chr, action) : chr)
    case 'ADD_CLASS':
      return state.map( chr => chr.name === 'Corrin' ? addCorrinClass(chr, action.className) : chr)
    case 'CHANGE_FRIEND':
    case 'CHANGE_SUPPORT':
      return state.map(chr => supportTree(chr, action))
    case 'SWITCH_SEX':
      corrin = newState.splice(newState.findIndex(chr => chr.name === 'Corrin'), 1)[0]
      console.log('corrin:', corrin)
      kana = newState.splice(newState.findIndex(chr => chr.name === 'Kana'), 1)[0]
      //switch
      corrin.sex = corrin.sex === 'male' ? 'female' : 'male'
      kana.sex = corrin.sex === 'male' ? 'female' : 'male'
      corrin.face = Images.Faces['Corrin_' + corrin.sex]
      kana.face = Images.Faces['Kana_' + kana.sex]

      //undo partner / friend
      if(corrin.friend !== 'None'){
        corrin.friend = 'None'
        corrin.friendClass = null
      }
      if(kana.friend !== 'None'){
        kana.friend = 'None'
        kana.friendClass = null
      }

      if(corrin.support !== 'None'){
         corrinPartner = newState.splice(state.findIndex(chr => chr.name === corrin.support), 1)[0]
         corrin.support = 'None'
         corrin.supportClass = null
         corrinPartner.support = 'None'
         corrinPartner.supportClass = null
         kana.supportParent = null
         kana.inheritedClass = null
         if(corrinPartner.childDefiner){
           partnerChild = newState.splice(newState.findIndex(chr => chr.name === corrinPartner.childName), 1)[0]
           partnerChild.supportParent = null
           partnerChild.inheritedClass = null
         }
      }
      if(kana.support !== 'None'){
        kanaPartner = newState.splice(newState.findIndex(chr => chr.name === kana.support), 1)[0]
        kana.support = 'None'
        kana.supportClass = null
        kanaPartner.support = 'None'
        kanaPartner.supportClass = null
      }

      return [corrin, kana,
        ...(corrinPartner? [corrinPartner] : []),
        ...(kanaPartner? [kanaPartner] : []),
        ...newState]
    default:
      return(state)
    }
}

export default characters
