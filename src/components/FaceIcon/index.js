import React from 'react'
import Images from '../../images/images.js'
import { PropTypes } from 'prop-types'
const faceStyle = {
  width: '50px',
  height: '50px'
}

const findKey = (name) => {
  for(var key in Images.Faces){
    if(key.indexOf(name) !== -1){
      return key
    }
  }
}

const FaceIcon = (props, context) => {
  const onClick = () => {
    context.store.dispatch({
      type: 'OPEN_STATUS',
      name: props.name
    })
  }
  return(
    <div>
      {props.name ?
        <div>
          <img style={faceStyle} src={Images.Faces[findKey(props.name)]} title={props.name} onClick={onClick} alt={props.name}/>
          {props.name}
        </div>
        :
        <div>
          <img style={faceStyle} src={Images.Faces[findKey('None')]} title={'None'} onClick={onClick} alt={'None'}/>
          None
        </div>
      }
    </div>
  )
}
FaceIcon.contextTypes = {
  store: PropTypes.object
}
export default FaceIcon
