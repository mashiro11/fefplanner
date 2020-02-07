import Database from '../database.js'
import Images from '../images/images.js'

//character2 inherits from character1
//TODO: needs class sex check
const inheritClass = (character1, character2) => {
  if(!character1.charClass[0]) return null

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

const changeFriend = (state, selected) => {
  let choosenSkills = state.choosenSkills
  if(selected.name === 'None' && state.friend){
    choosenSkills = removeSkills(state.friendClass[0].skills[0].name, state.choosenSkills)
  }
  return {
    ...state,
    choosenSkills,
    friend: selected.name,
    friendClass: selected.charClass[0]
  }
}

const createCharInfo = (character) => {
  let name = character.name === 'Corrin' || character.name === 'Kana' ?
             character.name + '_' + character.sex :
             character.name
  return {
    ...character,
    skill: {...Database.skills[character.skill],
            icon: Images.Skills[character.skill]},
    friend: 'None',
    support: 'None',
    friendClass: null,
    supportClass: null,
    childName: character.childDefiner ? character.child.name : null,
    childDefinerName: character.isChild ? character.childDefinerName : null,
    portrait: Images.Portraits[name],
    face: Images.Faces[name]
  }
}

const charactersInitialState = Object.values(Database.characters)
                                     //.filter( character => character.name !== 'Corrin' && character.name !== 'Kana')
                                     .map( (character, index) => createCharInfo(character) )

const corrinPath = (corrin, action) => {
  switch(action.gamePath){
    case 'all':
      return{
        ...corrin,
        charClass: [[corrin.charClass[0][0]],
                    ...(corrin.charClass[1] ? [corrin.charClass[1]] : []) ]
      }
    case 'bir':
      return{
        ...corrin,
        charClass: [[corrin.charClass[0][0], Database.classes['HoshidoNoble']],
                    ...(corrin.charClass[1] ? [corrin.charClass[1]] : [])]
      }
    case 'con':
      return{
        ...corrin,
        charClass: [[corrin.charClass[0][0], Database.classes['NohrNoble']],
                    ...(corrin.charClass[1] ? [corrin.charClass[1]] : [])]
      }
    case 'rev':
      return{
        ...corrin,
        charClass: [[corrin.charClass[0][0], Database.classes['NohrNoble'], Database.classes['HoshidoNoble']],
                    ...(corrin.charClass[1] ? [corrin.charClass[1]] : [])]
      }
    default:
      return corrin
  }
}

const addCorrinClass = (corrin, className) => {
  let choosenSkills = corrin.choosenSkills
  if(corrin.charClass.length === 2){
    if(corrin.friendClass && corrin.friendClass[0].name !== corrin.charClass[1][0].name &&
      corrin.supportClass && corrin.supportClass[0].name !== corrin.charClass[1][0].name)
      choosenSkills = removeSkills(corrin.charClass[1][0].skills[0].name, corrin.choosenSkills)
  }
  let addedClasses = [className, ...Database.classes[className].promotedClasses]
  addedClasses = addedClasses.filter( className => !Database.classes[className].sex || corrin.sex === Database.classes[className].sex)
                                    .map(className => Database.classes[className])
  return{
    ...corrin,
    choosenSkills,
    charClass: [corrin.charClass[0], addedClasses]
  }
}

const directSupport = (state, support) => {
  state = clearSupport(state)
  return {
      ...state,
      support: support.name,
      supportClass: inheritClass(support, state),
      //erase parent, if forbidden
      supportParent: support.isChild && support.childDefinerName === state.supportParent? null : state.supportParent,
      inheritedClass: support.isChild && support.childDefinerName === state.supportParent? null : state.inheritClass
    }
}

const childClassInheritance = (state, newParent) => {
  return{
        ...state,
        supportParent: newParent.name,
        inheritedClass: inheritClass(newParent, state),
        //erase support, if forbidden
        support: newParent.childDefiner && newParent.childName === state.support ? 'None' : state.support,
        supportClass: newParent.childDefiner && newParent.childName === state.support ? null : state.supportClass
      }
}

const verifyParenthood = (state, selected) => {
  return state.support === selected.childDefinerName ?
         clearSupport(state) : state
}

const clearSupport = (state) => {
  let choosenSkills = state.choosenSkills
  if(state.supportClass){
    choosenSkills = removeSkills(state.supportClass[0].skills[0].name, state.choosenSkills)
  }
  return {
    ...state,
    choosenSkills,
    support:  'None',
    supportClass: null
  }
}

const shigureCase = (state, action) => {
  //special Azura + Joker -> Shigure case
  if( (action.selected.name === 'Jakob' &&
        action.baseCharacter.name === 'Azura') ||
        (action.selected.name === 'Azura' &&
        action.baseCharacter.name === 'Jakob')) {
  const charClass = state.charClass
  //gives wyvernrider class
  charClass[1] = Database.characters['Camilla'].charClass[0]
    return {
      ...state,
      charClass: charClass,
      supportParent: action.selected.name,
      inheritClass: inheritClass(action.selected.name === 'Jakob' ? action.selected : action.baseCharacter, state)
    }
  }//non related child has parent stolen
  if(state.supportParent === 'Jakob' &&
    ( action.baseCharacter.name === 'Jakob'
      ||
      action.selected.name === 'Jakob'
      ||
      (action.baseCharacter.name === 'Azura' &&
      action.selected.name === 'None')
      ||
      (action.baseCharacter.name === 'Jakob' &&
      action.selected.name === 'None')
    )){
        const charClass = state.charClass
        charClass[1] = Database.characters['Jakob'].charClass[0]
        return{
          ...state,
          charClass: charClass,
          supportParent: 'None',
          inheritClass: null
        }
  }
  if('Shigure' === action.selected.name)
    return directSupport(state, action.baseCharacter)

  if('Shigure' === action.baseCharacter.name)
    return directSupport(state, action.selected)

  if(action.baseCharacter.name === 'Azura')
    return childClassInheritance(state, action.selected)

  if(action.selected.name === 'Azura')
    return childClassInheritance(state, action.baseCharacter)

  return state
}

const requiredSkills = (skill, baseClassLastSkill) =>{

    let newSkill = {
      ...Database.skills[skill.name],
      icon: Images.Skills[skill.name]
    }

    return skill.require && !skill.require_alt ?
            [...requiredSkills({...Database.skills[skill.require], icon: Images.Skills[skill.require]}, baseClassLastSkill), newSkill] :
          skill.require && skill.require_alt ?
            [...requiredSkills({...Database.skills[baseClassLastSkill], icon: Images.Skills[baseClassLastSkill]}, baseClassLastSkill), newSkill]
            : [newSkill]
}

const removeSkills = (skillName, skillL) => {
  let skill = skillL.find(s => s.name === skillName)
  let skillList = [...skillL.slice(0, skillL.indexOf(skill)),
                  ...skillL.slice(skillL.indexOf(skill)+1)]

  let toRemove = skillList.find( s => (s.require === skill.name && !skillList.find( sl => sl.name === s.require_alt)) ||
                                      (s.require_alt === skill.name && !skillList.find( sl => sl.name === s.require)))
  return toRemove ? removeSkills(toRemove.name, skillList) : skillList
}

const characters = (state = charactersInitialState, action) => {
  switch(action.type){
    case 'CHANGE_PATH':
      return state.map( chr => chr.name === 'Corrin' || chr.name === 'Kana'?
                        corrinPath(chr, action) : chr)
    case 'ADD_CLASS':
      return state.map( chr => chr.name === 'Corrin' || chr.name === 'Kana'?
                        addCorrinClass(chr, action.className) : chr)
    case 'CHANGE_FRIEND':
      return state.map( chr => chr.name === action.baseCharacter.name ?
                        changeFriend(chr, action.selected) : chr)
    case 'CHANGE_SUPPORT':
      return state.map( chr => chr.name === 'Shigure'? shigureCase(chr, action) :
                        chr.name === action.selected.name ? directSupport(chr, action.baseCharacter) :
                        chr.name === action.baseCharacter.name ? directSupport(chr, action.selected) :
                        chr.name === action.baseCharacter.childName ? childClassInheritance(chr, action.selected) :
                        chr.name === action.selected.childName ? childClassInheritance(chr, action.baseCharacter) :
                        chr.name === action.baseCharacter.childDefinerName ? verifyParenthood(chr, action.selected) :
                        chr.name === action.selected.childDefinerName ? verifyParenthood(chr, action.baseCharacter) :
                        chr.name === action.selected.support ? clearSupport(chr) :
                        chr.name === action.baseCharacter.support ? clearSupport(chr) : chr)
    case 'SWITCH_SEX':
      return state.map( chr => chr.name === 'Corrin' ||
                        chr.name === 'Kana' ?
                          clearSupport({
                            ...chr,
                            sex: chr.sex === 'male' ? 'female' : 'male',
                            portrait: Images.Portraits[chr.name + '_' + (chr.sex === 'male' ? 'female' : 'male')],
                            face: Images.Faces[chr.name + '_' + (chr.sex === 'male' ? 'female' : 'male')],
                            supportParent: null,
                            inheritClass: null,
                            friend: 'None',
                            friendClass: null
                          }) :
                        chr.support === 'Corrin' ||
                        chr.support === 'Kana' ?
                          clearSupport(chr) :
                        chr.friend === 'Corrin' ||
                        chr.friend === 'Kana' ?
                          changeFriend(chr, {name: 'None', charClass: [null]}) :
                        chr
      )
    case 'ADD_SKILL':
      return state.map( chr => {
                        if(chr.name === action.characterName){
                          const newSkill = Database.skills[action.skillName]
                          return chr.choosenSkills.find(skill => skill.name === newSkill.name) ? chr :
                                (chr.choosenSkills.find( skill => skill.name === newSkill.require) ||
                                 chr.choosenSkills.find( skill => skill.name === newSkill.require_alt))?
                                    {...chr,
                                      choosenSkills: [...chr.choosenSkills, newSkill]
                                    }
                                  :
                                    {...chr,
                                      choosenSkills: [...chr.choosenSkills,
                                                      ...(requiredSkills(newSkill, action.baseClassLastSkill).map( requiredSkill => {
                                                        let hasSkill = chr.choosenSkills.find( choosenSkill => choosenSkill.name === requiredSkill.name)
                                                        return hasSkill ? null : requiredSkill
                                                        }
                                                    ).filter( obj => obj))]
                                    }
                        }else return chr
                      })
    case 'REMOVE_SKILL':
      return state.map( chr =>{
                        if(chr.name === action.character.name){
                          return {
                            ...chr,
                            choosenSkills: removeSkills(action.skill, chr.choosenSkills)
                          }
                        }
                        else return chr
                      })
    case 'SHIFT_SKILL':
      return state
    default:
      return(state)
    }
}

export default characters
