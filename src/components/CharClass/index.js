import React from 'react'
import Images from '../../images/images.js'

const CharClass = (props) => {
  const { charClass, charName } = props
  return(
    <div>
      <div>{charClass.name}</div>
      <div>
        <span>
          <img src={Images.Gifs[charName+charClass.name]} alt={charClass.name} title={charClass.name}/>
        </span>
        { charClass.weapons.map( (weapon, index) =>
          <img src={Images.Weapons[weapon]} alt={weapon} title={weapon} key={index}/>
        )}
      </div>
      <div>
        { charClass.skills.map( (skill, index) =>
          <span key={index}>
            <img src={Images.Skills[skill.name]} alt={skill.name} title={skill.name+':\n'+skill.description}/>
          </span>
        )}
      </div>
    </div>
  )
}

export default CharClass
