import React from 'react'
import { connect } from 'react-redux'
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


class FaceIcon extends React.Component{

  getFace = (characterName) => {
    if(characterName === 'Corrin') return this.props.avatar.corrin.face
    if(characterName === 'Kana') return this.props.avatar.kana.face
    return Images.Faces[characterName]
  }

  render(){
    const { name } = this.props
    const wikia = 'http://fireemblem.wikia.com/wiki/' + name
    return(
      <div>
        <img style={faceStyle} src={this.getFace(name)} title={name} onClick={this.props.onFaceClick} alt={name} />
        {this.props.edit? <EditIcon onClick={this.props.onEditClick} style={editIcon}/> : null}
        {this.props.name === 'None' ?
          <div style={this.props.edit ? charName: null}>{name}</div> :
          <a href={wikia}><div style={this.props.edit ? charName: null}>{name}</div></a>
        }
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return{
    avatar: state.avatar
  }
}

export default connect(mapStateToProps)(FaceIcon)
