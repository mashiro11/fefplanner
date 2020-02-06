import React from 'react'
import Images from '../../images/images.js'
import Skill from '../Skill'

const styles = {
  skill: {
    cursor: 'pointer'
  }
}

const CharClass = (props) => {
  const { charClass, charName, charSex, onSkillClick } = props
  let classGif = charName+charClass.name + (charName === 'Corrin' || charName === 'Kana' ? charSex : '')
  return(
    <div>
      <img src={Images.Gifs[classGif]} alt={charClass.name} title={charClass.name}/>
      <div>{charClass.name}</div>
      <div>Uses:
        { charClass.weapons.map( (weapon, index) =>
          <img src={Images.Weapons[weapon]} alt={weapon} title={weapon} key={index}/>
        )}
      </div>
      <div>Skills:
        { charClass.skills.map( (skill, index) =>
          <Skill onClick={onSkillClick} skill={skill} key={index} />
        )}
      </div>
    </div>
  )
}

export default CharClass
