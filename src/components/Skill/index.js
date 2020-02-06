import React from 'react'
import Images from '../../images/images.js'

class Skill extends React.Component {
  render(){
    const { skill, onClick} = this.props
    return (
      <img onClick={onClick} src={Images.Skills[skill.name]} alt={skill.name} title={skill.name+':\n'+skill.description}/>
    )
  }
}
export default Skill
