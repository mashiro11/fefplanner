import React from 'react'
import Images from '../../images/images.js'

const styles = {
  skill: {
    cursor: 'pointer'
  }
}

const CharClass = (props) => {
  const { charClass, charName, charSex } = props
  let classGif = charName+charClass.name + (charName === 'Corrin' || charName === 'Kana' ? charSex : '')
  console.log('classGif:', classGif)
  console.log('gifs:', Images.Gifs)
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
          <span key={index}>
            <img style={styles.skill} src={Images.Skills[skill.name]} alt={skill.name} title={skill.name+':\n'+skill.description}/>
          </span>
        )}
      </div>
    </div>
  )
}

export default CharClass
