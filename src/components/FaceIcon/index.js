import React from 'react'
import Images from '../../images/images.js'
import { PropTypes } from 'prop-types'

const faceStyle = {
  width: '50px',
  height: '50px'
}

const FaceIcon = (props, context) => {
  const onClick = (e) => {
    if(e.target.title !== 'None'){
      context.store.dispatch({
        type: 'OPEN_STATUS',
        name: props.name
      })
    }
  }

  let { name } = props
  if(name === "Corrin" || name === "Kana"){
    name += '_' + props.gender
  }
  return(
    <div>
      <img style={faceStyle} src={Images.Faces[name]} title={props.name} onClick={onClick} alt={props.name} />
      <div>{props.name}</div>
    </div>
  )
}
FaceIcon.contextTypes = {
  store: PropTypes.object
}
export default FaceIcon
