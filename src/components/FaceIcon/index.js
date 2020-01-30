import React from 'react'
import EditIcon from '@material-ui/icons/Edit'

const faceStyle = {
  width: '50px',
  height: '50px',
  cursor: 'pointer'
}

const editIcon ={
  color: '#ffffff',
  position: 'relative',
  width: 16,
  height: 16,
  top:-20, left: 20,
  backgroundColor: 'gray',
  borderRadius:10,
  cursor: 'pointer',
  title: 'Edit'
}

const charName = {
  position: 'relative',
  top: -20
}


const FaceIcon = props => {
  const { character } = props
  const wikia = 'http://fireemblem.wikia.com/wiki/' + character.name
  return(
    <div>
      <img style={faceStyle} src={character.face} title={character.name} onClick={props.onFaceClick} alt={character.name} />
      {props.edit? <EditIcon onClick={props.onEditClick} style={editIcon}/> : null}
      {character.name === 'None' ?
        <div style={props.edit ? charName: null}>{character.name}</div> :
        <a href={wikia}><div style={props.edit ? charName: null}>{character.name}</div></a>
      }
    </div>
  )
}

export default FaceIcon
