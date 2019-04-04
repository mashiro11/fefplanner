import React from 'react'
import { connect } from 'react-redux'
import Images from '../../images/images.js'

const faceStyle = {
  width: '50px',
  height: '50px'
}

const FaceIcon = (props) => {


  let name = props.name + (props.name === 'Corrin' || props.name === 'Kana'? '_' + props.gender : '')

  return(
    <div>
      <img style={faceStyle} src={Images.Faces[name]} title={props.name} onClick={props.onClick} alt={props.name} />
      <div>{props.name}</div>
    </div>
  )
}
const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps)(FaceIcon)
