import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
import Images from '../../images/images.js'

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

const FaceIcon = (props) => {
  const wikia = 'http://fireemblem.wikia.com/wiki/' + props.name
  let name = props.name + (props.name === 'Corrin' || props.name === 'Kana'? '_' + props.gender : '')

  return(
    <div>
      <img style={faceStyle} src={Images.Faces[name]} title={props.name} onClick={props.onFaceClick} alt={props.name} />
      {props.edit? <EditIcon onClick={props.onEditClick} style={editIcon}/> : null}
      {props.name === 'None' ?
        <div style={props.edit ? charName: null}>{props.name}</div> : 
        <a href={wikia}><div style={props.edit ? charName: null}>{props.name}</div></a>
      }
    </div>
  )
}

export default FaceIcon
